"use client";

import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";
import { useMovies } from "@/lib/hooks";
import Image from "next/image";

export default function Home() {
  const res = useMovies();

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
        <h2 className="mb-4 text-2xl font-bold">Featured Movies</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {res?.data?.map((movie: MovieShort) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
