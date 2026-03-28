import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoadingProps {
  count?: number;
}

const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white mb-10 rounded-sm overflow-hidden border border-gray-100 p-4 h-full"
        >
          <Skeleton className="h-64 w-full rounded-sm mb-4" />

          <div className="space-y-4 px-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-4" />
              ))}
            </div>

            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />

            <div className="flex justify-between py-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>

            <hr className="border-dashed border-gray-400" />

            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoading;
