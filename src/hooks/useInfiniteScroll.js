import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

function useInfiniteScroll({
  fetchFn,
  queryKey,
  scrollContainer,
  observedEle,
}) {
  const observer = useRef();

  const { isFetching, isFetchingNextPage, fetchNextPage, data, hasNextPage } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        return await fetchFn(pageParam);
      },
      getNextPageParam: (lastPage, _) => lastPage?.nextPage ?? undefined,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    if (!isFetching) {
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

  return { isFetching, isFetchingNextPage, data, hasNextPage };
}

export default useInfiniteScroll;
