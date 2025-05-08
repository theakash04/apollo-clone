export type Doctor = {
  _id: string;
  name: string;
  speciality: string[];
  experience: number;
  qualification: string;
  clinicLocation: string;
  consult_fees?: number;
  image: string;
  Physical_fees?: number;
  about: string[];
  language: string[];
  mode: string[];
  isAvailable?: boolean;
  faculty: string;
};

export type NewDoctor = Omit<Doctor, "_id">;

export type FiltersType = {
  mode?: string[]; // e.g. ["online", "physical"]
  experience?: string[]; // e.g. ["6-10", "11-16"]
  fees?: string[]; // e.g. ["100-500", "500-1000"]
  languages?: string[]; // e.g. ["English", "Hindi"]
  faculty?: string[]; // e.g. ["Apollo Hospitals"]
};

export type DoctorQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: "name" | "experience" | "fees";
  sortOrder?: "asc" | "desc";
  mode?: string[]; // e.g. ["Online", "In-person"]
  experience?: [number, number]; // e.g. [0, 5]
  fees?: [number, number]; // e.g. [1000, 2000]
  languages?: string[]; // e.g. ["English", "Hindi"]
  faculty?: string;
  available?: boolean;
};

// Sorting options
export type SortOption =
  | "name - A to Z"
  | "name - Z to A"
  | "price - low to high"
  | "price - high to low";
