"use client";

import { FilterButton } from "@/components/FilterButton";
import { MovieCard } from "@/components/MovieCard";
import { useMovies } from "@/lib/hooks";
import { ApiMoviesParams } from "@/lib/routes/api";
import { Input } from "@headlessui/react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDebounce } from "use-debounce";

const LIMIT = 25;

export default function Home() {
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

  const { data: movies, totalPages } = useMovies(variables);
  const { data: lastPageMovies } = useMovies({
    ...variables,
    page: totalPages,
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <main>
      <section className="w-full bg-primary py-12 px-4 md:px-6 mb-6">
        <div className="container mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-background sm:text-5xl">
                  Discover the Best Movies
                </h1>
                <p className="max-w-[600px] text-background md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our vast collection of classic and contemporary films.
                  Find your next cinematic adventure.
                </p>
              </div>
            </div>
            <Image
              src="https://generated.vusercontent.net/placeholder.svg"
              width={550}
              height={310}
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

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
          <p>
            Viewing {getCurrentMovieCount().startIndex} -{" "}
            {getCurrentMovieCount().endIndex} of {getTotalMovieCount()}
          </p>
        </section>

        <section>
          {/* <h2 className="mb-4 text-2xl font-bold">Featured Movies</h2> */}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {movies?.map((movie: MovieShort) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </section>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={(page) => routeToPage(page.selected + 1)}
          pageRangeDisplayed={5}
          pageCount={totalPages || 0}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </main>
  );

  function getTotalMovieCount() {
    if (!totalPages || !lastPageMovies) return 0;
    return (totalPages - 1) * LIMIT + lastPageMovies?.length;
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
