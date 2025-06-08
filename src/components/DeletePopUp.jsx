import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../hooks/useFetch";
import {
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import API_BASE_URL from "../config/config";
import { useEffect } from "react";
function DeletePopUp({
  setDeletePopup,
  id,
  data_name,
  refetch,
  endpoint,
  data_id,
}) {
  const { isPending, mutate, data } = useMutation({
    mutationFn: async () => {
      return await useFetch(
        `${API_BASE_URL}/${endpoint}`,
        { [data_id]: id },
        "POST"
      );
    },
    onSuccess: () => {
      setDeletePopup(false);
      refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <div
        onClick={() => {
          setDeletePopup(false);
        }}
        className="dark:bg-black/50 bg-black/20 w-full h-full absolute top-0 left-0"
      ></div>
      <div className="dark:bg-lightDark bg-white rounded-sm md:w-[650px] w-full h-fit  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="text-center dark:text-white text-lightDark text-xl py-5 border-b dark:border-borderDark border-lightDark/20 flex justify-between px-4">
          WARNING !
          <FontAwesomeIcon
            onClick={() => {
              setDeletePopup(false);
            }}
            className="cursor-pointer hover:bg-gray-500/20 transition py-1 px-2 rounded-sm"
            icon={faXmark}
          />
        </div>
        <div className="flex items-center p-3 flex-col">
          <FontAwesomeIcon
            className="text-4xl text-red-500/90"
            icon={faTriangleExclamation}
          />
          <div className="dark:text-gray-400 text-lightDark text-center mt-5 text-xl leading-10 max-w-[500px] max-sm:flex max-sm:flex-col">
            Warning: You are about to permanently delete the selected data.
            <span className="bg-red-800 mx-2 text-white p-1">{data_name}</span>
            This action cannot be undone. Please confirm if you wish to proceed.
          </div>
        </div>
        <div className="flex gap-2">
          <div
            onClick={mutate}
            className="mt-3 bg-red-500/80 text-center px-4 w-1/2 py-2 text-white text-xl hover:bg-red-600/70 cursor-pointer"
          >
            {isPending ? "Loading ... " : "YES !"}
          </div>

          <div
            onClick={() => {
              setDeletePopup(false);
            }}
            className="mt-3 bg-gray-500/80 text-center px-4 w-1/2 py-2 text-white text-xl hover:bg-gray-600/70 cursor-pointer"
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeletePopUp;
