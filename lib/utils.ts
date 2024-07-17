type GetTotalMovieCountProps = {
  totalPages: number;
  endPageLength: number;
  limit: number;
};

export function getTotalMovieCount({
  totalPages = 0,
  endPageLength = 0,
  limit,
}: GetTotalMovieCountProps) {
  if (!totalPages) return 0;
  return (totalPages - 1) * limit + endPageLength;
}

type GetCurrentMovieCountProps = {
  currentPage: number;
  limit: number;
  totalMoviesCount: number;
};

export function getCurrentMovieCount({
  currentPage,
  limit,
  totalMoviesCount,
}: GetCurrentMovieCountProps) {
  const startIndex = (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, totalMoviesCount);
  return { startIndex, endIndex };
}
