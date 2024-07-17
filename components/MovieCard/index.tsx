import { getMovieDetailsRoute } from "@/lib/routes/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function MovieCard({ movie }: { movie: MoviePreview }) {
  return (
    <Link
      href={getMovieDetailsRoute(movie.id)}
      className="relative overflow-hidden rounded-md shadow-md"
      prefetch={false}
    >
      <Image
        src={
          movie?.posterUrl ||
          "https://generated.vusercontent.net/placeholder.svg"
        }
        alt={movie.title}
        width={300}
        height={450}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 px-4 py-2 text-white">
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <p className="text-sm">{getGenres()}</p>
      </div>
    </Link>
  );

  function getGenres() {
    return movie?.genres?.map((genre: Genre) => genre.title).join(", ");
  }
}
