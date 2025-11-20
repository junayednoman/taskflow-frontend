import { baseApi } from "./baseApi";

const memberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMembers: build.query({
      query: (team) => ({
        url: "/members",
        method: "GET",
        params: { team },
      }),
      providesTags: ["Members"],
    }),
  }),
});

export const { useGetMembersQuery } = memberApi;
