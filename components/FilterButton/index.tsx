import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FilterIcon } from "@/components/FilterIcon";
import { Oval } from "react-loader-spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@/lib/hooks";
import { GENRE_LIST_QUERY } from "@/lib/queries";

export function FilterButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: genresData, loading } = useQuery(GENRE_LIST_QUERY);

  if (loading || !genresData) return <>Loading...</>;

  const genres = genresData?.genres?.nodes;

  return (
    <Menu>
      <MenuButton className="border-2 border-text rounded px-2 py-1 text-text">
        <FilterIcon />
        <span className="sr-only">Filter</span>
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="z-50 border-2 border-secondary drop-shadow empty:invisible [--anchor-gap:4px] w-80 rounded bg-background"
      >
        <MenuItem>
          <button
            className="block data-[focus]:bg-secondary data-[focus]:text-background px-4 py-2 font-medium"
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
              className="block data-[focus]:bg-secondary data-[focus]:text-background px-4 py-2 font-medium"
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
  );
}
