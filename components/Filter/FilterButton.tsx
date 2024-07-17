import React, { useMemo } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FilterIcon } from "@/components/FilterIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@/lib/hooks";
import { GENRE_LIST_QUERY } from "@/lib/queries";
import clsx from "clsx";

export function FilterButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedGenre = useMemo(
    () => searchParams.get("genre"),
    [searchParams]
  );

  const { data: genresData, loading } = useQuery(GENRE_LIST_QUERY);

  const genres = genresData?.genres?.nodes;

  return (
    <div className="flex justify-start items-center gap-3">
      <Menu>
        <MenuButton
          disabled={loading || !genresData}
          className={clsx(
            "border-2 rounded px-2 py-1 disabled:opacity-30",
            !!selectedGenre
              ? "bg-secondary border-secondary text-background"
              : "border-secondary bg-background text-secondary"
          )}
        >
          <FilterIcon />
          <span className="sr-only">Filter</span>
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="z-50 border-2 border-secondary drop-shadow empty:invisible [--anchor-gap:4px] w-80 rounded bg-background"
        >
          <MenuItem>
            <button
              className={clsx(
                "block data-[focus]:bg-secondary data-[focus]:text-background px-4 py-2 font-medium w-full text-left",
                !selectedGenre ? "bg-secondary text-background" : ""
              )}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.delete("genre");
                params.delete("page");
                router.push(`${pathname}?${params.toString()}`);
              }}
            >
              All genres
            </button>
          </MenuItem>
          {genres?.map((genre: Genre) => (
            <MenuItem key={genre.id}>
              <button
                className={clsx(
                  "block data-[focus]:bg-secondary data-[focus]:text-background px-4 py-2 font-medium w-full text-left",
                  selectedGenre === genre.title
                    ? "bg-secondary text-background"
                    : ""
                )}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("genre", genre.title);
                  params.delete("page");
                  router.push(`${pathname}?${params.toString()}`);
                }}
              >
                {genre.title}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      {!!selectedGenre && (
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("genre");
            router.push(`${pathname}?${params.toString()}`);
          }}
          className="border-2 rounded px-2 py-1 bg-background border-secondary text-secondary"
        >
          x {selectedGenre}
        </button>
      )}
    </div>
  );
}
