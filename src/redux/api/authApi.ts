import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload) => ({
        url: "/auths/login",
        method: "POST",
        body: payload,
      }),
    }),
    signUp: build.mutation({
      query: (payload) => ({
        url: "/auths/signup",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;

export default authApi;
