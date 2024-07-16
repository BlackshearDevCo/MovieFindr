export const getAuthTokenRoute = () => "/auth/token";

export type ApiMoviesParams = {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
};

export const getMoviesRoute = (params?: ApiMoviesParams) => {
  let queryParams = new URLSearchParams();
  if (params?.page) queryParams.set("page", params.page.toString());
  if (params?.limit) queryParams.set("limit", params.limit.toString());
  if (params?.search) queryParams.set("search", params.search);
  if (params?.genre) queryParams.set("genre", params.genre);
  const finalParams = queryParams.toString();
  return `/movies${finalParams !== "" ? `?${finalParams}` : ""}`;
};
