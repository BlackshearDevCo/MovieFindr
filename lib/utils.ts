type GetTotalMovieCountProps = {
  totalPages: number;
  endPageLength: number;
  limit: Maybe<number>;
};

export function getTotalMovieCount({
  totalPages = 0,
  endPageLength = 0,
  limit = 25,
}: GetTotalMovieCountProps) {
  if (!totalPages) return 0;
  return (totalPages - 1) * limit + endPageLength;
}

type GetCurrentMovieCountProps = {
  currentPage: number;
  limit: Maybe<number>;
  totalMoviesCount: number;
};

export function getCurrentMovieCount({
  currentPage,
  limit = 25,
  totalMoviesCount,
}: GetCurrentMovieCountProps) {
  const startIndex = (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, totalMoviesCount);
  return { startIndex, endIndex };
}
