import { Skeleton } from "@/components/Skeleton";
import React from "react";

export function MovieSkeleton() {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 mt-8">
      <div className="w-full max-w-96 h-full aspect-[300/450]">
        <Skeleton />
      </div>

      <section className="w-full">
        <div className="h-10 w-96 font-bold mb-2">
          <Skeleton />
        </div>
        <div className="h-6 w-40">
          <Skeleton />
        </div>

        <div className="my-6">
          <div className="h-7 w-full mb-2">
            <Skeleton />
          </div>
          <div className="h-7 w-80">
            <Skeleton />
          </div>
        </div>

        <div className="my-6 flex flex-col gap-2">
          <div className="h-6 w-28">
            <Skeleton />
          </div>
          <div className="h-6 w-20">
            <Skeleton />
          </div>
          <div className="h-6 w-24">
            <Skeleton />
          </div>
          <div className="h-6 w-32">
            <Skeleton />
          </div>
          <div className="h-6 w-40">
            <Skeleton />
          </div>
          <div className="h-6 w-60">
            <Skeleton />
          </div>
          <div className="h-6 w-36">
            <Skeleton />
          </div>
        </div>
      </section>
    </div>
  );
}
