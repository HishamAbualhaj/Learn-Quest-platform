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

// *** first step ***

// [
//   {
//     status: true,
//     msg: [{ student_id: 1 }, { student_id: 2 }, { student_id: 3 }],
//     redirect: true,
//   },
//   {
//     status: true,
//     msg: [{ student_id: 4 }, { student_id: 5 }, { student_id: 6 }],
//     redirect: true,
//   },
//   {
//     status: true,
//     msg: [{ student_id: 7 }, { student_id: 8 }, { student_id: 9 }],
//     redirect: true,
//   },
// ];


// *** second step ***

// [
//   [{ student_id: 1 }, { student_id: 2 }, { student_id: 3 }],
//   [{ student_id: 4 }, { student_id: 5 }, { student_id: 6 }],
//   [{ student_id: 7 }, { student_id: 8 }, { student_id: 9 }],
// ];


// *** third step ***

// [
//   { student_id: 1 },
//   { student_id: 2 },
//   { student_id: 3 },
//   { student_id: 4 },
//   { student_id: 5 },
//   { student_id: 6 },
//   { student_id: 7 },
//   { student_id: 8 },
//   { student_id: 9 },
// ];


// *** last step for Map ***
// key -> value to avoid duplication

// [
//   [1, { student_id: 1 }],
//   [2, { student_id: 2 }],
//   [3, { student_id: 3 }],
//   [4, { student_id: 4 }],
// ];
export default useArrange;
