import { TTask } from "@/app/(generalLayout)/dashboard/tasks/task.validation";
import { baseApi } from "./baseApi";

const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTask: build.mutation({
      query: (body: TTask) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task", "Projects", "Members"],
    }),
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
    updateTask: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Task", "Projects", "Members"],
    }),
    deleteTask: build.mutation({
      query: (id: string) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task", "Projects", "Members"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useReAssignTaskMutation,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
