import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardData: build.query({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      providesTags: ["DashboardData"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
