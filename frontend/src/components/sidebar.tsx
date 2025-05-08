"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { SidebarClose } from "lucide-react";
import { useDoctorContext } from "@/context/doctorContext";
import { FiltersType } from "@/types/doctorTypes";

type FilterOption = {
  label: string;
  value: string;
};

type FilterCategory = {
  key: keyof FiltersType;
  title: string;
  options: FilterOption[];
  showMoreCount?: number;
};

type SidebarProps = {
  className?: string;
};

const filterCategories: FilterCategory[] = [
  {
    key: "mode",
    title: "Mode of Consult",
    options: [
      { label: "Hospital Visit", value: "physical" },
      { label: "Online Consult", value: "online" },
    ],
  },
  {
    key: "experience",
    title: "Experience (in Years)",
    options: [
      { label: "0-5", value: "0-5" },
      { label: "6-10", value: "6-10" },
      { label: "11-16", value: "11-16" },
      { label: "16+", value: "16+" },
    ],
  },
  {
    key: "fees",
    title: "fees (in Rupees)",
    options: [
      { label: "100-500 ₹", value: "100-500" },
      { label: "500-1000 ₹", value: "500-1000" },
      { label: "1000+ ₹", value: "1000+" },
    ],
  },
  {
    key: "languages",
    title: "Language",
    options: [
      { label: "English", value: "English" },
      { label: "Hindi", value: "Hindi" },
      { label: "Telugu", value: "Telugu" },
      { label: "Tamil", value: "Tamil" },
      { label: "Kannada", value: "Kannada" },
      { label: "Malayalam", value: "Malayalam" },
      { label: "Bengali", value: "Bengali" },
      { label: "Marathi", value: "Marathi" },
      { label: "Gujarati", value: "Gujarati" },
      { label: "Punjabi", value: "Punjabi" },
      { label: "Urdu", value: "Urdu" },
    ],
  },
  {
    key: "faculty",
    title: "Faculty",
    options: [
      { label: "Apollo Hospitals", value: "Apollo Hospital" },
      { label: "Other Clinics", value: "Other Clinics" },
    ],
  },
];

export default function Sidebar({ className }: SidebarProps) {
  const [expandedOptions, setExpandedOptions] = useState<Set<string>>(
    new Set()
  );

  const { setFilters, filters, isSidebarOpen, setSideBarOpen } =
    useDoctorContext();

  const toggleFilter = (key: keyof FiltersType, value: string) => {
    setFilters((prev: FiltersType) => {
      const current = prev[key] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      return {
        ...prev,
        [key]: updated,
      };
    });
  };

  const clearAll = () => {
    setFilters({});
    setExpandedOptions(new Set());
  };

  return (
    <div
      className={`
        fixed inset-y-0 left-0 xl:top-20 top-0 w-full
        xl:w-64 bg-white shadow-lg xl:z-20 z-50
        transform transition-transform duration-200
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        xl:sticky xl:top-20 xl:inset-auto
        xl:transform-none xl:translate-x-0 xl:shadow-none ${className}
      `}
    >
      <div className="sticky top-0 flex flex-col">
        <div className="px-6 relative flex flex-col gap-4">
          <div className="xl:hidden absolute top-3 right-3">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="cursor-pointer"
              aria-label="Close sidebar"
              onClick={() => setSideBarOpen(false)}
            >
              <SidebarClose />
            </Button>
          </div>
          <div className="flex items-center justify-between xl:pt-4 pt-14">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <Button
              onClick={clearAll}
              className="cursor-pointer text-primary hover:text-primary/80"
              size={"sm"}
              variant={"ghost"}
            >
              Clear all
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-0 max-h-[calc(100vh-250px)]">
            {filterCategories.map((category) => (
              <div key={category.title} className="mb-4">
                <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">
                    {category.title}
                  </span>
                </button>

                <div className="ml-4 pl-2 border-l-2 border-gray-100">
                  {(expandedOptions.has(category.title)
                    ? category.options
                    : category.options.slice(0, 3)
                  ).map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          filters[category.key]?.includes(option.value) || false
                        }
                        onChange={() =>
                          toggleFilter(category.key, option.value)
                        }
                        className="h-4 w-4 border-gray-300 text-blue-600 rounded-sm focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}

                  {/* + More Button */}
                  {category.options.length > 3 &&
                    !expandedOptions.has(category.title) && (
                      <button
                        onClick={() => {
                          setExpandedOptions((prev) => {
                            const next = new Set(prev);
                            next.add(category.title);
                            return next;
                          });
                        }}
                        className="mt-2 text-sm text-blue-600 hover:underline cursor-pointer hover:text-blue-700"
                      >
                        +{category.options.length - 3} more
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 pt-4 pb-6">
          <a
            href="/specialties/general-physician-internal-medicine?page=5&sortby=distance"
            className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Show Doctors Near Me
          </a>
        </div>
      </div>
    </div>
  );
}
