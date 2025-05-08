import { useDoctorContext } from "@/context/doctorContext";
import { Button } from "./ui/Button";
import { SidebarClose, SidebarOpen } from "lucide-react";

export default function SortDropdown() {
  const {
    sortOption,
    setSortOption,
    isSidebarOpen,
    setSideBarOpen,
    totalDoctors
  } = useDoctorContext();

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
      {/* Page Title */}
      <div className="w-full flex">
        <Button
          className="cursor-pointer hidden md:block xl:hidden"
          variant={"ghost"}
          aria-label="Open sidebar"
          onClick={() => setSideBarOpen(!isSidebarOpen)}
        >
          {!isSidebarOpen ? <SidebarOpen /> : <SidebarClose />}
        </Button>
        <div className="w-full flex flex-col gap-1 ">
          <h1 className="text-xl md:text-2xl font-extrabold text-foreground leading-6 w-full">
            Consult General Physicians Online - Internal Medicine Specialists{" "}
          </h1>
          <span className="text-foreground/90 font-semibold text-sm">
            ({totalDoctors + " doctors"})
          </span>
        </div>
      </div>

      {/* Sort Button */}
      <div className="flex items-center md:justify-end justify-between ">
        <Button
          className="cursor-pointer block md:hidden"
          variant={"ghost"}
          aria-label="Open sidebar"
          onClick={() => setSideBarOpen(!isSidebarOpen)}
        >
          {!isSidebarOpen ? <SidebarOpen /> : <SidebarClose />}
        </Button>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="name - A to Z">name - A to Z</option>
          <option value="name - Z to A">name - Z to A</option>
          <option value="price - low to high">price - low to high</option>
          <option value="price - high to low">price - high to low</option>
          <option value="availability">availability</option>
        </select>
      </div>
    </div>
  );
}
