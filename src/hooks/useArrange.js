function useArrange(data, id) {
  // extracting data array from each response object
  // combining all data[] in one array
  // storing them in Map to avoid duplication
  return !data?.pages[0]
    ? []
    : [
        ...new Map(
          data?.pages
            .map((dataArr) => dataArr?.msg)
            .flatMap((arrs) => arrs)
            .map((item) => [item[id], item])
        ).values(),
      ];
}

export default useArrange;
