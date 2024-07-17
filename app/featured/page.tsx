"use client";

import { MovieCard } from "@/components/MovieCard";
import { useQuery } from "@/lib/hooks";
import { GENRES_QUERY } from "@/lib/queries";
import React from "react";

const MOVIES_LIMIT = 10;

export default function GenresPage() {
  const { data: genresData, loading } = useQuery(GENRES_QUERY);

  if (loading || !genresData) return <>Loading...</>;

  const genres = genresData?.genres?.nodes;

  return (
    <div className="flex flex-col container mx-auto px-4 min-h-80 mb-8 mt-6 gap-6">
      <h2 className="text-4xl font-bold mb-3">Featured Movies by Genre</h2>

      {genres?.map((genre: Genre) => (
        <section key={genre.id}>
          <h2 className="text-3xl font-bold mb-3">{genre.title}</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {genre.movies?.slice(0, MOVIES_LIMIT)?.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
