"use client";

import React, { useCallback, useMemo } from "react";
import { MovieCard } from "../MovieCard";
import { EmptyMoviesList } from "./EmptyMoviesList";
import Paginate from "../Paginate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCurrentMovieCount, getTotalMovieCount } from "@/lib/utils";
import { MOVIES_PREVIEW_QUERY } from "@/lib/queries";
import { useQuery } from "@/lib/hooks";
import { MovieCardSkeleton } from "@/components/MovieCard/MovieCardSkeleton";

type Props = {
  movies: Movie[];
  variables: ApiMoviesParams;
  totalPages: number;
  currentPage: number;
};

export function MoviesList({
  movies,
  variables,
  totalPages,
  currentPage,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: lastMoviesPageData } = useQuery(MOVIES_PREVIEW_QUERY, {
    variables: {
      search: variables.search,
      genre: variables.genre,
      perPage: variables.limit,
      page: totalPages,
    },
  });

  const lastMoviesPage = lastMoviesPageData?.movies?.nodes;
  const totalMoviesCount = useMemo(
    () =>
      getTotalMovieCount({
        totalPages,
        endPageLength: lastMoviesPage?.length,
        limit: variables.limit,
      }),
    [lastMoviesPage, totalPages, variables]
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div>
      <section>
        {movies?.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {movies?.map((movie: MoviePreview) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        ) : (
          <EmptyMoviesList />
        )}
      </section>

      {!!movies?.length && (
        <Paginate
          forcePage={parseInt(searchParams.get("page") || "1") - 1}
          onPageChange={(page) => routeToPage(page.selected + 1)}
          pageCount={totalPages || 0}
          startMovieCountIndex={
            getCurrentMovieCount({
              currentPage,
              limit: variables.limit,
              totalMoviesCount,
            }).startIndex
          }
          endMovieCountIndex={
            getCurrentMovieCount({
              currentPage,
              limit: variables.limit,
              totalMoviesCount,
            }).endIndex
          }
          totalMovieCount={totalMoviesCount}
        />
      )}
    </div>
  );

  function routeToPage(page: number) {
    router.push(`${pathname}?${createQueryString("page", String(page))}`);
  }
}
