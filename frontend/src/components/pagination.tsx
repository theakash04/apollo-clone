import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/Button";

type PaginationProps = {
  total: number;
  page: number;
  setPage: (val: number) => void;
  pageSize: number;
};

export default function Pagination({
  total,
  page,
  setPage,
  pageSize,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex justify-end items-center mt-6 space-x-2">
      <Button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        size={"icon"}
        className="disabled:opacity-50"
        variant="outline"
      >
        <ArrowLeftIcon />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <span
          key={num}
          onClick={() => setPage(num)}
          className={`underline p-2 cursor-pointer ${
            page === num ? "text-blue-600" : "text-violet-400"
          }`}
        >
          {num}
        </span>
      ))}

      <Button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        size={"icon"}
        className="disabled:opacity-50"
        variant="outline"
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}
