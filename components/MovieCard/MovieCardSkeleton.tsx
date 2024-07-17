import React from "react";
import { Skeleton } from "@/components/Skeleton";

export function MovieCardSkeleton() {
  return (
    <div className="aspect-[300/450] rounded-xl overflow-hidden">
      <Skeleton />
    </div>
  );
}
