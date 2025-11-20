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
    deleteLog: build.mutation({
      query: (id) => ({
        url: `/logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Logs"],
    }),
  }),
});

export const { useGetLogsQuery, useDeleteLogMutation } = logsApi;
