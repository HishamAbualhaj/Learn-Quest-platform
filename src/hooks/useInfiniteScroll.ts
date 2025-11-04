import { useInfiniteQuery } from "@tanstack/react-query";
import { RefObject, useEffect, useRef, useState } from "react";
import useArrange from "./useArrange";
import { FetchResponse } from "./useFetch";
type UseInfiniteScrollProps<T> = {
  fetchFn: (pageParam: number) => Promise<FetchResponse<T>>;
  queryKey: readonly unknown[];
  scrollContainer: RefObject<HTMLElement | null>;
  observedEle: HTMLElement | null;
  data_id: keyof T;
};


type UseInfiniteScrollReturn<T> = {
  isFetching: boolean;
  isFetchingNextPage: boolean;
  dataFetched: T[];
  hasNextPage?: boolean;
  refetch: () => void;
};

function useInfiniteScroll<T extends Record<string, any>>({
  fetchFn,
  queryKey,
  scrollContainer,
  observedEle,
  data_id,
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
  const observer = useRef<IntersectionObserver | undefined>(undefined);

  const [dataFetched, setDataFetched] = useState<T[]>([]);
  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    data,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchFn(pageParam);
    },
    getNextPageParam: (lastPage, _) => lastPage?.nextPage ?? undefined,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (!isFetching) {
      const dataStored = useArrange<T>(data, data_id);
      setDataFetched((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(dataStored)) {
          return prev;
        }
        return dataStored;
      });

      if (observer) observer.current?.disconnect();

      if (!observedEle) return;
      let options = {
        root: scrollContainer.current,
        rootMargin: "0px",
        threshold: 1.0,
      };

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (!hasNextPage) return;
          fetchNextPage();
        }
      }, options);

      observer.current.observe(observedEle);
    }
  }, [observedEle, isFetching]);

  return { isFetching, isFetchingNextPage, dataFetched, hasNextPage, refetch };
}

export default useInfiniteScroll;
