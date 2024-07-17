import React from "react";
import { getHomeRoute } from "@/lib/routes/client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FilterIcon } from "@/components/FilterIcon";
import Link from "next/link";
import { useGenres } from "@/lib/hooks";
import { Oval } from "react-loader-spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: genres } = useGenres();

  if (!genres?.length)
    return (
      <div className="border border-text rounded px-2 py-1 w-min text-primary">
        <Oval
          visible={true}
          height="24"
          width="24"
          color="currentColor"
          secondaryColor="currentColor"
          strokeWidth={6}
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <span className="sr-only">Filter</span>
      </div>
    );

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
