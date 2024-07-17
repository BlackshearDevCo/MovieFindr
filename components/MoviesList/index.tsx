"use client";

import { FilterButton } from "@/components/FilterButton";
import { MovieCard } from "@/components/MovieCard";
import { useQuery } from "@/lib/hooks";
import { MOVIES_PREVIEW_QUERY } from "@/lib/queries";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDebounce } from "use-debounce";

const LIMIT = 25;

export function MoviesList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
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

  const { data: moviesData } = useQuery(MOVIES_PREVIEW_QUERY, {
    variables: {
      search: variables.search,
      genre: variables.genre,
      perPage: variables.limit,
      page: variables.page,
    },
  });

  const { data: lastMoviesPageData } = useQuery(MOVIES_PREVIEW_QUERY, {
    variables: {
      search: variables.search,
      genre: variables.genre,
      perPage: variables.limit,
      page: moviesData?.movies?.pagination?.totalPages,
    },
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const movies = moviesData?.movies?.nodes;
  const lastMoviesPage = lastMoviesPageData?.movies?.nodes;
  const totalPages = moviesData?.movies?.pagination?.totalPages;

  const sharedPaginateClasses =
    "inline-flex justify-center items-center hover:bg-accent hover:text-background rounded-md bg-background transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50";

  return (
    <div className="container mx-auto px-4 min-h-80 mb-8">
      <section className="flex items-center gap-2 mb-4">
        <Input
          name="Search"
          type="text"
          placeholder="Search for a movie..."
          className="px-4 py-2 rounded text-text w-80"
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", "1");
            params.set("search", e.target.value);
            setQuery(e.target.value);
            router.push(`${pathname}?${params.toString()}`);
          }}
        />
        <FilterButton />
      </section>

      <section>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {movies?.map((movie: MoviePreview) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </section>

      <div className="flex flex-col justify-center items-center mt-6">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          forcePage={parseInt(searchParams.get("page") || "1") - 1}
          onPageChange={(page) => routeToPage(page.selected + 1)}
          pageRangeDisplayed={5}
          pageCount={totalPages || 0}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          containerClassName="flex mx-auto w-min gap-2 mb-2"
          activeLinkClassName="bg-text text-background transition-colors"
          pageClassName="text-text transition-colors text-base"
          pageLinkClassName={clsx("h-8 w-8", sharedPaginateClasses)}
          breakLinkClassName={clsx("h-8 w-8", sharedPaginateClasses)}
          nextClassName={clsx("px-2", sharedPaginateClasses)}
          previousClassName={clsx("px-2", sharedPaginateClasses)}
        />

        <p>
          Viewing {getCurrentMovieCount().startIndex} -{" "}
          {getCurrentMovieCount().endIndex} of {getTotalMovieCount()}
        </p>
      </div>
    </div>
  );

  function getTotalMovieCount() {
    if (!totalPages || !lastMoviesPage) return 0;
    return (totalPages - 1) * LIMIT + lastMoviesPage?.length;
  }

  function getCurrentMovieCount() {
    const startIndex = (currentPage - 1) * LIMIT + 1;
    const endIndex = Math.min(currentPage * LIMIT, getTotalMovieCount());
    return { startIndex, endIndex };
  }

  function routeToPage(page: number) {
    router.push(`${pathname}?${createQueryString("page", String(page))}`);
  }
}
