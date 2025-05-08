"use client";

// type SkeletonCardProps = {
//   key: string;
// };

export default function SkeletonCard() {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white animate-pulse flex flex-col w-full max-w-full relative">
      <div className="flex gap-4 w-full flex-col md:flex-row">
        {/* Image Placeholder */}
        <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0" />

        {/* Details Placeholder */}
        <div className="flex flex-col flex-1 space-y-2">
          <div className="w-3/5 h-4 bg-gray-200 rounded" />
          <div className="w-2/5 h-3 bg-gray-200 rounded" />
          <div className="w-2/5 h-3 bg-gray-200 rounded" />
          <div className="w-full h-3 bg-gray-200 rounded mt-2" />
        </div>

        {/* Action Placeholder */}
        <div className="flex flex-col items-center justify-center gap-2 w-full md:w-auto mt-4 md:mt-0">
          <div className="w-16 h-4 bg-gray-200 rounded" />
          <div className="w-full md:w-auto h-8 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
