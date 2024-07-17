import { MoviesSection } from "@/components/Movies";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
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
            <div className="relative">
              <Image
                // Credit: Samuel Regan-Asante [https://unsplash.com/photos/the-walking-dead-dvd-movie-wMkaMXTJjlQ]
                src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={550}
                height={310}
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <p className="absolute bottom-2 left-2 text-text text-xs opacity-50">
                Credit: Samuel Regan-Asante
              </p>
            </div>
          </div>
        </div>
      </section>

      <Suspense>
        <MoviesSection />
      </Suspense>
    </main>
  );
}
