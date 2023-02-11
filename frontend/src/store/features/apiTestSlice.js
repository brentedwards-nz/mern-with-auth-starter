import { apiSlice } from "../../services/apiSlice";

export const apiTestSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    test: builder.query({
      query: () => ({
        url: '/test/test'
      })
    }),
  }),
  overrideExisting: false,
})

export const {
  useTestQuery
} = apiTestSlice