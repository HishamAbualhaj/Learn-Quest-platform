"use client";
import { Dialog } from "radix-ui";
import { Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
interface DeletePopUpProps {
  setDeletePopup: Dispatch<SetStateAction<boolean>>;
  id: string;
  data_name: string;
  refetch: () => void;
  endpoint: string;
  data_id: string;
}
export default function DeletePopUp({
  setDeletePopup,
  id,
  data_name,
  refetch,
  endpoint,
  data_id,
}: DeletePopUpProps) {
  const [error, setError] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await useFetch(
        `${API_BASE_URL}/${endpoint}`,
        { [data_id]: id },
        "POST",
      );
      if (!res.status)
        throw new Error(
          typeof res.msg === "string"
            ? res.msg
            : "Unable to delete this record.",
        );
      return res;
    },
    onSuccess: () => {
      setDeletePopup(false);
      refetch();
    },
    onError: (e) => setError(e.message),
  });
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open && !isPending) setDeletePopup(false);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[71] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md border border-borderLight bg-white p-6 text-lightText shadow-xl outline-none dark:border-borderDark dark:bg-dark dark:text-white">
          <div className="mb-5 flex size-12 items-center justify-center rounded-md bg-red-500/10 text-red-700 dark:text-red-300">
            <Trash2 aria-hidden="true" className="size-6" />
          </div>
          <Dialog.Title className="text-xl font-semibold">
            Delete this record?
          </Dialog.Title>
          <Dialog.Description className="mt-3 text-sm leading-7 text-muted-foreground">
            Permanently delete{" "}
            <span className="font-semibold break-words text-lightText dark:text-white">
              {data_name}
            </span>
            ? This action cannot be undone.
          </Dialog.Description>
          {error && (
            <p
              role="alert"
              className="mt-4 text-sm text-red-700 dark:text-red-300"
            >
              {error}
            </p>
          )}
          <div className="mt-7 flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button
                variant="outline"
                className="min-h-11"
                disabled={isPending}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              className="min-h-11 bg-red-700 text-white hover:bg-red-800"
              disabled={isPending}
              onClick={() => {
                setError("");
                mutate();
              }}
            >
              {isPending ? "Deleting..." : "Delete record"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
