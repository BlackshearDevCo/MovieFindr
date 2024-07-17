import { MoviesList } from "@/components/MoviesList";
import Image from "next/image";

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

      <MoviesList />
    </main>
  );
}
