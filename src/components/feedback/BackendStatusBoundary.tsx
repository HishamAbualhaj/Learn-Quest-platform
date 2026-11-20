"use client";
import { useSyncExternalStore, type ReactNode } from "react";
import {
  subscribeBackendStatus,
  getBackendStatus,
  getServerBackendStatus,
} from "@/lib/backendStatus";
import ServiceUnavailable from "./ServiceUnavailable";
export default function BackendStatusBoundary({
  children,
}: {
  children: ReactNode;
}) {
  const unavailable = useSyncExternalStore(
    subscribeBackendStatus,
    getBackendStatus,
    getServerBackendStatus,
  );
  return unavailable ? <ServiceUnavailable /> : children;
}
