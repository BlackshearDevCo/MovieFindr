import useSWR from "swr";
import {
  OperationVariables,
  QueryResult,
  useQuery as useApolloQuery,
} from "@apollo/client";

export const useAuthToken = () => {
  const { data } = useSWR("/auth/token");
  return data?.token;
};

export const useQuery = (
  QUERY: any,
  options?: OperationVariables
): QueryResult<any, OperationVariables> => {
  const token = useAuthToken();
  return useApolloQuery(QUERY, {
    variables: options?.variables,
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token ? token : ""}`,
      },
    },
    ...options,
  });
};
