import useFetch from "../hooks/useFetch";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import API_BASE_URL from "../config/config";
import { useState, useRef, useEffect } from "react";

function TableScroll({
  title,
  subtile,
  data_key,
  data_id,
  endpoint,
  columns = [],
  customActions = null,
  Component = () => <></>,
}) {
  const [data, setData] = useState([]);
  const [lastNode, setLastNode] = useState(null);
  const dataContainer = useRef();
  const { dataFetched, isFetching, hasNextPage, refetch } = useInfiniteScroll({
    fetchFn: (pagePara) => {
      return useFetch(
        `${API_BASE_URL}/${endpoint}`,
        { page: pagePara },
        "POST"
      );
    },
    queryKey: [data_key],
    scrollContainer: dataContainer,
    observedEle: lastNode,
    data_id: data_id,
  });

  useEffect(() => {
    setData(dataFetched);
  }, [dataFetched]);

  const observeEle = (node) => {
    setLastNode(node);
  };

  return (
    <>
      <div className="flex items-center justify-between sm:flex-row flex-col">
        <div>
          <div className="dark:text-white text-black font-semibold text-4xl">
            {title}
          </div>
          <div className="dark:text-gray-400 text-lightText mt-2 ">
            {subtile}
          </div>
        </div>
        <Component />
      </div>

      <div
        ref={dataContainer}
        className="h-[650px] mt-10 overflow-auto pr-5"
      >
        <table className="dark:text-gray-300 text-lightText w-full">
          <thead>
            <tr className="border-t border-b dark:border-borderDark border-borderLight">
              {columns.map((col) => (
                <td key={col.key} className="py-4 font-bold whitespace-nowrap">
                  {col.label}
                </td>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                ref={data.at(-1) === item ? observeEle : null}
                key={item[data_id]}
                className="border-t border-b dark:border-borderDark border-borderLight"
              >
                {columns.map((col) =>
                  col.key === "action" ? (
                    <></>
                  ) : (
                    <td
                      key={col.key}
                      className="py-4 whitespace-nowrap xl:pr-0 pr-8"
                    >
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key]}
                    </td>
                  )
                )}
                {customActions && (
                  <td className="whitespace-nowrap  p-2 flex flex-col gap-2">
                    {customActions(item, refetch)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {isFetching ? (
          <div className="dark:text-red-300 text-red-600 flex justify-center py-5 animate-syncPuls">
            Loading ...
          </div>
        ) : (
          !hasNextPage && (
            <div className="dark:text-red-300 text-red-600 flex justify-center py-5">
              No more data
            </div>
          )
        )}
      </div>
    </>
  );
}

export default TableScroll;
