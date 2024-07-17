"use client";

import { useMovie } from "@/lib/hooks";
import { getHomeRoute } from "@/lib/routes/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MoviePage({ params }: { params: { id: string } }) {
  const { data: movie } = useMovie(params.id);

  // TODO: Add loading state
  if (!movie) return null;

  return (
    <div className="container mx-auto mt-8 px-4 md:px-0">
      <Link href={getHomeRoute()}>Back to movies</Link>

      <div className="flex flex-wrap md:flex-nowrap gap-4 mt-8">
        <div className="w-full max-w-96">
          <Image
            src={
              movie?.posterUrl ||
              "https://generated.vusercontent.net/placeholder.svg"
            }
            alt={movie.title}
            width={500}
            height={750}
            className="h-full w-full object-cover"
          />
        </div>

        <section className="flex-shrink">
          {/* Main Details Section */}
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="opacity-60">{getGenres()}</p>
          <p className="text-lg my-4">{movie.summary}</p>

          <ul className="flex flex-col gap-1">
            <li>
              <p>
                <strong className="font-bold">Rating:</strong> {movie.rating}
              </p>
            </li>
            <li>
              <p>
                <strong className="font-bold">Duration:</strong>{" "}
                {movie.duration}
              </p>
            </li>
            <li>
              <p>
                <strong className="font-bold">Date Published:</strong>{" "}
                {movie.datePublished}
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
                {movie.ratingValue} / {movie.bestRating}
              </p>
            </li>
            <li>
              <p>
                <strong className="font-bold">Best Rating:</strong>{" "}
                {movie.bestRating}
              </p>
            </li>
            <li>
              <p>
                <strong className="font-bold">Worst Rating:</strong>{" "}
                {movie.worstRating}
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );

  function getGenres() {
    return movie?.genres?.map((genre) => genre.title).join(", ");
  }
}

// id	"4Of0hHwbRXr2X7OzFEGZKl"
// title	"Akira"
// posterUrl	"https://m.media-amazon.com/images/M/MV5BNjFmNWYzZjMtYWIyZi00NDVmLWIxY2EtN2RiMjZiMDk4MzcyXkEyXkFqcGdeQXVyMTg2NjYzOA@@._V1_.jpg"
// rating	"AA"
// summary	"A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath who can only be stopped by a teenager, his gang of biker friends and a group of psychics."
// duration	"PT2H4M"
// directors	[ "Katsuhiro Ôtomo" ]
// mainActors	[ "Mitsuo Iwata", "Nozomu Sasaki", "Mami Koyama" ]
// datePublished	"1988-07-16"
// ratingValue	8
// bestRating	10
// worstRating	1
// writers	[ "Katsuhiro Ôtomo", "Izô Hashimoto" ]
// genres	[ {…}, {…}, {…} ]
