import { QueryClient, isServer } from "@tanstack/react-query";

function getQueryClient() {
  const makeQueryClient = () => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    });
  };

  let browserQueryClient: QueryClient | undefined = undefined;
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

export default getQueryClient;
