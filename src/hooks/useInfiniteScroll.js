import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import useArrange from "./useArrange";

function useInfiniteScroll({
  fetchFn,
  queryKey,
  scrollContainer,
  observedEle,
  data_id,
}) {
  const observer = useRef();

  const [dataFetched, setDataFetched] = useState([]);
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
      const dataStored = useArrange(data, data_id);
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

  return { isFetching, isFetchingNextPage, dataFetched, hasNextPage };
}

export default useInfiniteScroll;
