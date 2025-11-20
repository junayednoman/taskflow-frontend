import { baseApi } from "./baseApi";

const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query({
      query: (params) => ({
        url: "/tasks",
        method: "GET",
        params,
      }),
      providesTags: ["Task"],
    }),
    reAssignTask: build.mutation({
      query: () => ({
        url: "/tasks/reassign",
        method: "PATCH",
      }),
      invalidatesTags: ["Task", "Logs"],
    }),
  }),
});

export const { useGetTasksQuery, useReAssignTaskMutation } = taskApi;
