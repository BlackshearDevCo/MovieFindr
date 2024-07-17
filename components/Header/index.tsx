import { getFeaturedRoute, getHomeRoute } from "@/lib/routes/client";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import React from "react";

export function Header() {
  return (
    <header className="w-full sticky top-0 z-40 flex justify-between items-center bg-primary text-background py-4 px-4 md:px-6 h-20">
      <div className="flex gap-4 sm:gap-12">
        <Link href="/" prefetch={false} className="flex items-center">
          <h1 className="font-extrabold uppercase text-xl tracking-tight">
            MovieFindr
          </h1>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
          <HeaderLink href={getHomeRoute()}>Home</HeaderLink>
          <HeaderLink href={getFeaturedRoute()}>Featured Movies</HeaderLink>
        </nav>
      </div>
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
