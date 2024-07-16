"use client";
import { SWRConfig } from "swr";
export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource) =>
          fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}${resource}`).then((res) =>
            res.json()
          ),
      }}
    >
      {children}
    </SWRConfig>
  );
};
