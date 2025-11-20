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
    checkCapacity: build.mutation({
      query: (memberId: string) => ({
        url: `/members/${memberId}/capacity`,
        method: "POST",
      }),
    }),
    getLeastLoadedMembers: build.mutation({
      query: ({ projectId }) => {
        return {
          url: `/members/${projectId}/least-loaded`,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useCreateMemberMutation,
  useGetMembersQuery,
  useCheckCapacityMutation,
  useGetLeastLoadedMembersMutation,
} = memberApi;
