import { TCreateMember } from "@/app/(generalLayout)/dashboard/members/member.validation";
import { baseApi } from "./baseApi";

const memberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createMember: build.mutation({
      query: (body: TCreateMember) => ({
        url: "/members",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Members"],
    }),
    getMembers: build.query({
      query: (params) => ({
        url: "/members",
        method: "GET",
        params,
      }),
      providesTags: ["Members"],
    }),
  }),
});

export const { useCreateMemberMutation, useGetMembersQuery } = memberApi;
