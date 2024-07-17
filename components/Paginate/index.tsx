import clsx from "clsx";
import React from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

type PaginateProps = ReactPaginateProps & {
  startMovieCountIndex: number;
  endMovieCountIndex: number;
  totalMovieCount: number;
};

export default function Paginate({
  startMovieCountIndex,
  endMovieCountIndex,
  totalMovieCount,
  ...props
}: PaginateProps) {
  const sharedPaginateClasses =
    "inline-flex justify-center items-center hover:bg-accent hover:text-background rounded-md bg-background transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50";

  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        pageRangeDisplayed={5}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName="flex mx-auto gap-2 mb-2 flex-wrap justify-center"
        activeLinkClassName="bg-text text-background transition-colors"
        pageClassName="text-text transition-colors text-base"
        pageLinkClassName={clsx("h-8 w-8", sharedPaginateClasses)}
        breakLinkClassName={clsx("h-8 w-8", sharedPaginateClasses)}
        nextClassName={clsx("px-2", sharedPaginateClasses)}
        previousClassName={clsx("px-2", sharedPaginateClasses)}
        {...props}
      />

      <p>
        Viewing {startMovieCountIndex} - {endMovieCountIndex} of{" "}
        {totalMovieCount}
      </p>
    </div>
  );
}
