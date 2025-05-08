"use client";
import AddDoctor from "@/components/AddDoctor";
import DoctorCard from "@/components/card";
import Header from "@/components/Header";
import Pagination from "@/components/pagination";
import Sidebar from "@/components/sidebar";
import SkeletonCard from "@/components/skeletonCard";
import SortDropdown from "@/components/sort";
import { Button } from "@/components/ui/Button";

import { useDoctorContext } from "@/context/doctorContext";
import { Pen } from "lucide-react";

import { useEffect, useState } from "react";

export default function DoctorsPage() {
  const { filteredDoctors, isLoading, setFilters, totalDoctors } = useDoctorContext();
  const [currPage, setCurrPage] = useState<number>(1);
  const [addIsOpen, setAddOpen] = useState<boolean>(false);

  const pageSize = 5;


  useEffect(() => {
    setFilters((prev) => ({
      ...prev, page: [currPage.toString()], limit: [pageSize.toString()],

    }))
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currPage]);

  return (
    <div className="flex flex-col min-h-screen relative ">
      <div className="fixed xl:bottom-20 bottom-10 right-10 z-40">
        <Button
          size={"lg"}
          variant={"default"}
          className="w-12 h-12 rounded-full p-8 cursor-pointer"
          onClick={() => setAddOpen(true)}
        >
          <Pen />
        </Button>
      </div>

      <div
        className={`absolute bg-black/30 inset-0 z-60 justify-center items-center backdrop-blur-2xl overflow-hidden ${addIsOpen ? "flex" : "hidden"
          }`}
      >
        <div className="max-w-6xl w-full h-screen">
          <AddDoctor onCloseAction={() => setAddOpen(false)} />
        </div>
      </div>
      <Header />
      <div className="w-full max-w-[95rem] mx-auto grid grid-cols-1 xl:grid-cols-9 gap-6 px-4 pt-4">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="col-span-1 xl:col-span-6 ml-0 xl:ml-[6.25rem] pb-5 bg-background min-h-screen">
          <div className="flex items-center justify-between w-full relative">
            <SortDropdown />
          </div>
          <div className="space-y-4 mt-4 w-full">
            {!isLoading ? (
              filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <h2 className="text-lg font-semibold text-gray-700">
                    No doctors found
                  </h2>
                  <p className="text-sm text-gray-500">
                    Please try a different search or filter option.
                  </p>
                </div>
              )
            ) : (
              [...Array(pageSize)].map((_, index) => (
                <SkeletonCard key={index.toString()} />
              ))
            )}
          </div>
          {totalDoctors > 0 && (
            <Pagination
              total={totalDoctors}
              page={currPage}
              setPage={setCurrPage}
              pageSize={pageSize}
            />
          )}
        </main>

        {/* Right Side Card/Component */}
        <aside className="hidden xl:block col-span-1 xl:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-20">
            <h3 className="font-medium text-lg mb-3">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our healthcare experts are available to assist you in finding the
              right doctor.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Call us</p>
                  <p className="text-sm font-medium">1800-123-4567</p>
                </div>
              </div>
            </div>

            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors cursor-pointer">
              Contact Us
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
