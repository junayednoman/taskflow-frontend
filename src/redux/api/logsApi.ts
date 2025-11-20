import { baseApi } from "./baseApi";

const logsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLogs: build.query({
      query: (params) => ({
        url: "/logs",
        method: "GET",
        params,
      }),
      providesTags: ["Logs"],
    }),
  }),
});

export const { useGetLogsQuery } = logsApi;
