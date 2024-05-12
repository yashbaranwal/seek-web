import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://restcountries.com/v3.1/",
  // prepareHeaders: (headers, { getState }) => {

  //   // if (token) {
  //   //   headers.set("authorization", `Bearer ${token}`);
  //   // }

  //   return headers;
  // },
});

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllCountries: builder.query<any, void>({
      query: () => {
        return {
          url: "all",
        };
      },
    }),
    getSearchCountry: builder.query({
      query: (searchTerm) => {
        return {
          url: `name/${searchTerm}`,
        };
      },
    }),
    getRegion: builder.query({
      query: (region) => {
        return {
          url: `region/${region}`,
        };
      },
    }),
    
  }),
});

export const {
  useGetAllCountriesQuery,
  useGetSearchCountryQuery,
  useGetRegionQuery,
 
} = myApi;
