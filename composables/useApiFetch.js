export const useApiFetch = (path, options) => {
  const config = useRuntimeConfig();

  let headers = {
    accept: "application/json",
    referer: config.public.appUrl,
  };
  const token = useCookie("XSRF-TOKEN");

  if (token.value) {
    headers["X-XSRF-TOKEN"] = token.value;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
    };
  }

  return useFetch(config.public.apiUrl + path, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });
};
