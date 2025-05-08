import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { InfoIcon } from "lucide-react";
import { Doctor } from "@/types/doctorTypes";
import Image from "next/image";
import { useDoctorContext } from "@/context/doctorContext";

type DoctorCardProps = {
  doctor: Doctor;
};

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const { filters } = useDoctorContext();
  const modeFiltersRaw = (filters.mode ?? []) as string[];
  const modeFilters = modeFiltersRaw.map((m) => m.toLowerCase());
  const showPhysical =
    (doctor.Physical_fees ?? 0) > 0 &&
    (modeFilters.length === 0 || modeFilters.includes("physical"));
  const showOnline =
    (doctor.consult_fees ?? 0) > 0 &&
    (modeFilters.length === 0 || modeFilters.includes("online"));
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setShowPanel(false);
      }
    }
    if (showPanel) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPanel]);

  return (
    <div
      title={doctor.name}
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col items-center justify-between md:flex-row w-full"
    >
      {/* Left box: Image + Details */}
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-4 relative">
          <div className="w-20 h-20 flex-shrink-0">
            <Image
              src={doctor.image || "/doctor_default.png"}
              alt={doctor.name}
              width={74}
              height={74}
              className="object-cover rounded-full w-full h-full"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="flex items-center gap-2">
              <h2 className="text-lg font-bold truncate ">{doctor.name}</h2>
              <button
                type="button"
                aria-label="Show doctor details"
                onClick={() => setShowPanel(true)}
                className="hover:text-violet-600 transition cursor-pointer"
              >
                <InfoIcon size={18} />
              </button>
            </span>
            <p className="text-sm text-gray-600 truncate">
              {doctor.speciality}
            </p>
            <p className="text-sm text-violet-600 truncate">
              {doctor.experience} Years • {doctor.qualification}
            </p>
            <p className="text-sm text-gray-500 truncate pt-1">
              {doctor.clinicLocation}
            </p>
          </div>
        </div>
      </div>

      {/* Right box: Action Buttons */}
      <div className="flex items-center justify-center gap-4 md:w-1/2 w-full mt-4 md:mt-0">
        {showOnline && (
          <div className="flex flex-col items-center gap-2 w-full">
            <p className="text-md font-bold text-foreground">
              ₹{doctor.consult_fees}
            </p>
            <Button className="py-6 w-full" variant="outline">
              Consult Online
            </Button>
          </div>
        )}
        {showPhysical && (
          <div className="flex flex-col items-center gap-2 w-full">
            <p className="text-md font-bold text-foreground">
              ₹{doctor.Physical_fees}
            </p>
            <Button className="py-6 w-full">Visit Doctor</Button>
          </div>
        )}
      </div>

      {/* Overlay */}
      {showPanel && (
        <div className="fixed inset-0 bg-foreground/20 bg-opacity-20 z-40 transition-opacity"></div>
      )}

      {/* Sliding Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-[375px] max-w-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out rounded-l-xl ${
          showPanel ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="">
          <div className="flex flex-col justify-center p-4 border-b">
            <h3 className="font-bold text-lg">{doctor.name}</h3>
            <p className="text-md text-muted-foreground">{doctor.speciality}</p>
          </div>

          <div className="py-2">
            <ol className="flex flex-col gap-1 marker:text-foreground list-disc px-8">
              {doctor.about.map((item, index) => (
                <li key={index} className="text-sm text-foreground/70">
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="p-4 border-t absolute bottom-0 left-0 right-0">
          <div className="flex items-center justify-end gap-4">
            <Button
              variant={"ghost"}
              className="text-primary"
              onClick={() => setShowPanel(false)}
            >
              Close
            </Button>
            <Link href={`#`}>
              <Button variant={"default"} className="w-full" disabled>
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
