let unavailable = false;
const listeners = new Set<() => void>();
export function reportBackendUnavailable() {
  if (typeof window === "undefined") return;
  unavailable = true;
  listeners.forEach((listener) => listener());
}
export function subscribeBackendStatus(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export function getBackendStatus() {
  return unavailable;
}
export const getServerBackendStatus = () => false;
export async function backendFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  try {
    const response = await fetch(input, {
      ...init,
      signal: init?.signal ?? AbortSignal.timeout(15000),
    });
    if (response.status === 403 || response.status >= 500) {
      throw new Error("The platform is temporarily unavailable.");
    }
    return response;
  } catch (error) {
    if (!(error instanceof Error && error.name === "AbortError"))
      reportBackendUnavailable();
    throw error;
  }
}
