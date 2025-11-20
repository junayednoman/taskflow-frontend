import { baseApi } from "./baseApi";
import { TCreateProject } from "@/app/(generalLayout)/dashboard/projects/_components/CreateProjectModal";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: (body: TCreateProject) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),
    getProjects: build.query({
      query: (params) => ({
        url: "/projects",
        method: "GET",
        params,
      }),
      providesTags: ["Projects"],
    }),
  }),
});

export const { useCreateProjectMutation, useGetProjectsQuery } = projectApi;
