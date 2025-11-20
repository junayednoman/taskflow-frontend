import { baseApi } from "./baseApi";

const teamApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTeamApis: build.query({
      query: () => ({
        url: "/teams",
        method: "GET",
      }),
      providesTags: ["Teams"],
    }),
    createTeam: build.mutation({
      query: (body: { name: string }) => ({
        url: "/teams",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teams"],
    }),
    updateTeam: build.mutation({
      query: (body: { id: string; name: string }) => ({
        url: `/teams/${body.id}`,
        method: "PATCH",
        body: { name: body.name },
      }),
      invalidatesTags: ["Teams"],
    }),
  }),
});

export const {
  useGetTeamApisQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
} = teamApi;
