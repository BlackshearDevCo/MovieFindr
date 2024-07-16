"use client";

import { FilterIcon } from "@/components/FilterIcon";
import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";
import { useGenres, useMovies } from "@/lib/hooks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const { data: movies } = useMovies({
    genre: decodeURI(searchParams.get("genre") || ""),
  });
  const { data: genres } = useGenres();

  return (
    <main className="">
      <Header />

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
        <Menu>
          <MenuButton className="border border-text rounded px-2 py-1">
            <FilterIcon />
            <span className="sr-only">Filter</span>
          </MenuButton>
          <MenuItems
            anchor="bottom start"
            className="z-10 border-2 border-secondary drop-shadow empty:invisible [--anchor-gap:4px] w-80 rounded py-2 bg-background"
          >
            {genres?.map((genre: any) => (
              <MenuItem key={genre.id}>
                <Link
                  className="block data-[focus]:bg-secondary data-[focus]:text-background px-4 py-2 font-medium"
                  href={`?genre=${encodeURI(genre.title)}`}
                >
                  {genre.title}
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Featured Movies</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {movies?.map((movie: MovieShort) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
