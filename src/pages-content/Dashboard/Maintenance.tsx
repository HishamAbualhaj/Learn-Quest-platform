"use client";
import { useState } from "react";
import { ShieldCheck, Wrench, Radio, LoaderCircle } from "lucide-react";
import { Dialog } from "radix-ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import { Button } from "@/components/ui/button";
import {
  AdminHeading,
  AdminFeedback,
  adminPanel,
} from "@/components/admin/AdminPage";
import type { User } from "@/types";
export default function Maintenance({ userData }: { userData: User }) {
  const [confirm, setConfirm] = useState(false);
  const [notice, setNotice] = useState("");
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["maintenance"],
    queryFn: async () => {
      const res = await useFetch(`${API_BASE_URL}/getMaintenace`, null, "GET");
      const value = res.msg?.[0]?.status;
      if (!res.status || ![0, 1, true, false].includes(value))
        throw new Error("Status unavailable");
      return Boolean(value);
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const {
    mutate,
    isPending,
    error: saveError,
  } = useMutation({
    mutationFn: async () => {
      if (data === undefined) throw new Error("Refresh platform status first.");
      const res = await useFetch(
        `${API_BASE_URL}/setMaintenance`,
        { ...userData, status: data },
        "POST",
      );
      if (!res.status) throw new Error(String(res.msg));
    },
    onSuccess: () => {
      setConfirm(false);
      setNotice("Platform status updated successfully.");
      void refetch();
    },
  });
  return (
    <>
      <AdminHeading
        title="Maintenance"
        description="Control learner access while you make changes to the platform."
      />
      <section className={`${adminPanel} overflow-hidden`}>
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-borderLight p-6 dark:border-borderDark">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-md bg-mainClr/10 text-mainClr dark:text-mainClrDark">
              <Radio aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h2 className="text-xl font-semibold">Platform availability</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Current access for your learning community
              </p>
            </div>
          </div>
          <span
            className={`rounded-md border px-3 py-2 text-sm font-medium ${data === undefined ? "border-input text-muted-foreground" : data ? "border-green-500/20 bg-green-500/10 text-green-800 dark:text-green-300" : "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-300"}`}
          >
            {data === undefined
              ? "Status unavailable"
              : data
                ? "Platform online"
                : "Maintenance enabled"}
          </span>
        </div>
        <div className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <h3 className="text-lg font-semibold">
              {data === false
                ? "Ready to welcome learners back?"
                : "Give your next update the space it needs."}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Enabling maintenance redirects learners to the maintenance screen.
              Administrators retain access to this workspace so you can finish
              your work and restore access.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck
                aria-hidden="true"
                className="size-5 text-mainClr dark:text-mainClrDark"
              />
              Your admin workspace stays available.
            </div>
          </div>
          <Button
            className="min-h-11 self-start"
            disabled={data === undefined || isFetching || isPending}
            onClick={() => {
              setNotice("");
              setConfirm(true);
            }}
          >
            <Wrench aria-hidden="true" />
            {data === false ? "Restore platform access" : "Enable maintenance"}
          </Button>
        </div>
        <AdminFeedback
          loading={isFetching}
          error={error}
          retry={() => void refetch()}
          label="Checking platform status"
        />
        {notice && (
          <p
            role="status"
            className="px-8 pb-6 text-sm text-green-800 dark:text-green-300"
          >
            {notice}
          </p>
        )}
      </section>
      <Dialog.Root
        open={confirm}
        onOpenChange={(open) => {
          if (!isPending) setConfirm(open);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/60" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-[71] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md border border-input bg-white p-6 text-lightText outline-none dark:bg-dark dark:text-white">
            <Dialog.Title className="text-xl font-semibold">
              {data ? "Enable maintenance mode?" : "Restore learner access?"}
            </Dialog.Title>
            <Dialog.Description className="mt-3 text-sm leading-7 text-muted-foreground">
              {data
                ? "Learners will see the maintenance page until you restore access. This update takes a few seconds."
                : "Learners will be able to access the platform again. This update takes a few seconds."}
            </Dialog.Description>
            {saveError && (
              <p
                role="alert"
                className="mt-4 text-sm text-red-700 dark:text-red-300"
              >
                {saveError.message}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
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
                className="min-h-11"
                disabled={isPending}
                onClick={() => mutate()}
              >
                {isPending && (
                  <LoaderCircle
                    aria-hidden="true"
                    className="animate-spin motion-reduce:animate-none"
                  />
                )}
                {isPending ? "Updating..." : "Confirm change"}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
