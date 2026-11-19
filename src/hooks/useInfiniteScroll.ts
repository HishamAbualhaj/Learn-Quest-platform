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
  viewportRoot?: boolean;
  retry?: number;
};

type UseInfiniteScrollReturn<T> = {
  isFetching: boolean;
  isFetchingNextPage: boolean;
  dataFetched: T[];
  hasNextPage?: boolean;
  refetch: () => void;
  loadMore: () => void;
  error: Error | null;
};

function useInfiniteScroll<T extends Record<string, any>>({
  fetchFn,
  queryKey,
  scrollContainer,
  observedEle,
  data_id,
  viewportRoot = false,
  retry,
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
    error,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchFn(pageParam);
    },
    getNextPageParam: (lastPage, _) => lastPage?.nextPage ?? undefined,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    retry,
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
        root: viewportRoot ? null : scrollContainer.current,
        rootMargin: viewportRoot ? "200px 0px" : "0px",
        threshold: viewportRoot ? 0 : 1.0,
      };

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (!hasNextPage || error) return;
          fetchNextPage();
        }
      }, options);

      observer.current.observe(observedEle);
    }
    return () => observer.current?.disconnect();
  }, [observedEle, isFetching, viewportRoot, error]);

  return {
    isFetching,
    isFetchingNextPage,
    dataFetched,
    hasNextPage,
    refetch,
    error,
    loadMore: () => {
      void fetchNextPage();
    },
  };
}

export default useInfiniteScroll;
