import { Skeleton } from "@/components/Skeleton";
import React from "react";

export function MovieSkeleton() {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 mt-8">
      <div className="w-full max-w-96 h-full aspect-[300/450]">
        <Skeleton />
      </div>

      <section className="w-full">
        {/* Main Details Section */}
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
        {/* <p className="opacity-60">{getGenres()}</p>
        <p className="text-lg my-4">{movie?.summary}</p> */}

        {/* <ul className="flex flex-col gap-1">
          <li>
            <p>
              <strong className="font-bold">Rating:</strong> {movie?.rating}
            </p>
          </li>
          <li>
            <p>
              <strong className="font-bold">Duration:</strong> {movie?.duration}
            </p>
          </li>
          <li>
            <p>
              <strong className="font-bold">Date Published:</strong>{" "}
              {movie?.datePublished}
            </p>
          </li>
          <li>
            <p>
              <strong className="font-bold">Directors:</strong>{" "}
              {movie?.directors?.join(", ")}
            </p>
          </li>
          <li>
            <p>
              <strong className="font-bold">Writers:</strong>{" "}
              {movie?.writers?.join(", ")}
            </p>
          </li>
          <li>
            <p>
              <strong className="font-bold">Main Actors:</strong>{" "}
              {movie?.mainActors?.join(", ")}
            </p>
          </li>
          <li>
            <p>
              <strong className="font-bold">Rating Value:</strong>{" "}
              {movie?.ratingValue} / {movie?.bestRating}
            </p>
          </li>
        </ul> */}
      </section>
    </div>
  );
}
