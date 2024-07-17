"use client";

import React, { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@/lib/hooks";
import { MOVIES_PREVIEW_QUERY } from "@/lib/queries";
import { FilterButton } from "../Filter/FilterButton";
import { useDebounce } from "use-debounce";
import { Input } from "@headlessui/react";
import { MoviesList } from "./MoviesList";
import { MovieCardSkeleton } from "../MovieCard/MovieCardSkeleton";

const LIMIT = 25;

export function MoviesSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(
    decodeURI(searchParams.get("search") || "")
  );
  const [searchValue] = useDebounce(query, 250);

  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1"),
    [searchParams]
  );

  const variables = useMemo<ApiMoviesParams>(
    () => ({
      search: searchValue || "",
      page: currentPage,
      genre: decodeURI(searchParams.get("genre") || ""),
      limit: LIMIT,
    }),
    [searchParams, currentPage, searchValue]
  );

  const { data: moviesData, loading } = useQuery(MOVIES_PREVIEW_QUERY, {
    variables: {
      search: variables.search,
      genre: variables.genre,
      perPage: variables.limit,
      page: variables.page,
    },
  });

  const movies = moviesData?.movies?.nodes;

  return (
    <div className="container mx-auto px-4 min-h-80 mb-8">
      <section className="flex items-center gap-2 mb-4 flex-wrap sm:flex-nowrap">
        <Input
          name="Search"
          type="text"
          value={query}
          placeholder="Search for a movie..."
          className="px-4 py-2 rounded text-text w-80"
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", "1");
            if (e.target.value !== "") params.set("search", e.target.value);
            else params.delete("search");
            setQuery(e.target.value);
            router.push(`${pathname}?${params.toString()}`);
          }}
        />
        <FilterButton />
      </section>

      {!!moviesData ? (
        <MoviesList
          movies={movies}
          variables={variables}
          totalPages={moviesData?.movies?.pagination?.totalPages}
          currentPage={currentPage}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
        </div>
      )}
    </div>
  );
}
