"use client";

import { useQuery } from "@/lib/hooks";
import { MOVIE_QUERY } from "@/lib/queries";
import { getHomeRoute } from "@/lib/routes/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MovieSkeleton } from "@/app/movies/[id]/MovieSkeleton";

export default function MoviePage({ params }: { params: { id: string } }) {
  const { data: movieData } = useQuery(MOVIE_QUERY, {
    variables: {
      movieId: params.id,
    },
  });

  const movie: Movie = movieData?.movie;

  return (
    <div className="container mx-auto mt-8 px-4 md:px-0">
      <Link href={getHomeRoute()}>Back to movies</Link>

      {!!movieData ? (
        <div className="flex flex-wrap md:flex-nowrap gap-4 mt-8">
          <div className="w-full max-w-96">
            <Image
              src={
                movie?.posterUrl ||
                "https://generated.vusercontent.net/placeholder.svg"
              }
              alt={movie?.title}
              width={500}
              height={750}
              className="h-full w-full object-cover"
            />
          </div>

          <section className="flex-shrink">
            {/* Main Details Section */}
            <h1 className="text-4xl font-bold">{movie?.title}</h1>
            <p className="opacity-60">{getGenres()}</p>
            <p className="text-lg my-4">{movie?.summary}</p>

            <ul className="flex flex-col gap-1">
              <li>
                <p>
                  <strong className="font-bold">Rating:</strong> {movie?.rating}
                </p>
              </li>
              <li>
                <p>
                  <strong className="font-bold">Duration:</strong>{" "}
                  {movie?.duration}
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
            </ul>
          </section>
        </div>
      ) : (
        <MovieSkeleton />
      )}
    </div>
  );

  function getGenres() {
    return movie?.genres?.map((genre: Genre) => genre.title).join(", ");
  }
}
