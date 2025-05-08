"use client";

import { Doctor, DoctorQueryParams, NewDoctor } from "@/types/doctorTypes";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type FiltersType = {
  [key: string]: string[];
};

type DoctorContextType = {
  doctors: NewDoctor[];
  filteredDoctors: Doctor[];
  addDoctor: (doctor: NewDoctor) => void;
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  totalDoctors: number;
};

const DoctorContext = createContext<DoctorContextType | null>(null);

export function DoctorProvider({ children }: { children: ReactNode }) {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[] | []>([]);
  const [filters, setFilters] = useState<FiltersType>({});
  const [sortOption, setSortOption] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSidebarOpen, setSideBarOpen] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<NewDoctor[]>([]);
  const [totalDoctors, setTotalDoctors] = useState<number>(0);

  const addDoctor = async (doc: NewDoctor) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doc),
        }
      );
      const newDoctor = await response.json();
      if (!response.ok) {
        throw new Error("Failed to add doctor");
      }
      setDoctors((prev) => [...prev, newDoctor]);
      setFilteredDoctors((prev) => [...prev, newDoctor]);

      fetchDoctorsWithFilters(filters).then((result) => {
        setFilteredDoctors(result.data); // Update the filtered doctors list
      });
    } catch (err) {
      console.error("Error adding doctor:", err);
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchDoctorsWithFilters(filters: DoctorQueryParams = {}) {
    const params = new URLSearchParams();

    // Pagination
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());
    else params.append("limit", "5");

    // Sorting
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

    // Filters
    if (filters.mode) {
      filters.mode.forEach((m) => params.append("mode", m));
    }

    if (filters.experience) {
      params.append(
        "experience",
        `${filters.experience[0]}-${filters.experience[1]}`
      );
    }

    if (filters.fees) {
      params.append("fees", `${filters.fees[0]}-${filters.fees[1]}`);
    }

    if (filters.languages) {
      filters.languages.forEach((lang) => params.append("languages", lang));
    }

    if (filters.faculty) {
      params.append("faculty", filters.faculty);
    }

    if (filters.available !== undefined) {
      params.append("available", filters.available.toString());
    }

    const url = `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
    }/doctors-with-filters?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error fetching doctors: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  }

  useEffect(() => {
    setIsLoading(true);
    let updated: Doctor[] = [];

    const queryParams: DoctorQueryParams = {};

    // convert filters to query params
    if (filters.mode) queryParams.mode = filters.mode;
    if (filters.experience?.[0]) {
      const experienceStr = filters.experience[0];
      if (experienceStr.includes("-")) {
        const [min, max] = experienceStr.split("-").map(Number);
        queryParams.experience = [min, max];
      } else if (experienceStr.endsWith("+")) {
        const min = parseInt(experienceStr);
        queryParams.experience = [min, 99]; // Or any high upper bound
      }
    }
    if (filters.fees?.[0]) {
      const feesStr = filters.fees[0];
      if (feesStr.includes("-")) {
        const [min, max] = feesStr.split("-").map(Number);
        queryParams.fees = [min, max];
      } else if (feesStr.endsWith("+")) {
        const min = parseInt(feesStr);
        queryParams.fees = [min, 99999]; // Or any high upper bound
      }
    }
    if (filters.page?.[0]) {
      queryParams.page = parseInt(filters.page[0], 10);
    }
    if (filters.languages) queryParams.languages = filters.languages;
    if (filters.faculty?.[0]) queryParams.faculty = filters.faculty[0];

    // Sorting
    if (sortOption === "price - low to high") {
      queryParams.sortBy = "fees";
      queryParams.sortOrder = "asc";
    } else if (sortOption === "price - high to low") {
      queryParams.sortBy = "fees";
      queryParams.sortOrder = "desc";
    } else if (sortOption === "name - Z to A") {
      queryParams.sortBy = "name";
      queryParams.sortOrder = "desc";
    } else {
      queryParams.sortBy = "name";
      queryParams.sortOrder = "asc";
    }

    if (sortOption === "availability") {
      queryParams.available = true;
    }
    fetchDoctorsWithFilters(queryParams).then((result) => {
      updated = [...result.data];
      setFilteredDoctors(updated);
      setTotalDoctors(result.total);
      setIsLoading(false);
    });
  }, [doctors, filters, sortOption]);

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        filteredDoctors,
        addDoctor,
        filters,
        setFilters,
        sortOption,
        setSortOption,
        setSideBarOpen,
        isSidebarOpen,
        isLoading,
        setIsLoading,
        totalDoctors,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctorContext() {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error("useDoctorContext must be used within a DoctorProvider");
  }
  return context;
}
