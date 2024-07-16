import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import React from "react";
import { SearchInput } from "./SearchInput";

export function Header() {
  return (
    <header className="w-full sticky top-0 z-40 flex justify-between items-center bg-primary text-background py-4 px-4 md:px-6 h-20">
      <div className="flex gap-12">
        <Link href="/" prefetch={false}>
          <h1 className="font-extrabold uppercase text-xl tracking-tight">
            MovieFindr
          </h1>
        </Link>

        <nav className="flex items-center gap-6">
          <HeaderLink href="/">Home</HeaderLink>
          <HeaderLink href="/movies">Movies</HeaderLink>
          <HeaderLink href="/genres">Genres</HeaderLink>
        </nav>
      </div>

      <SearchInput />
    </header>
  );
}

type HeaderLinkProps = LinkProps & {
  className?: string;
  children: React.ReactNode;
};

function HeaderLink({ href, className, children, ...props }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      className={clsx("font-bold", className)}
      prefetch={false}
      {...props}
    >
      {children}
    </Link>
  );
}
