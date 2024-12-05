import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAsteroid } from "@asteroids/shared/schemas";
import axios from "axios";

export const asteroidsApi = createApi({
  reducerPath: "asteroidsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAsteroids: builder.query<
      IAsteroid[],
      {
        startDate?: number;
        endDate?: number;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: ({ startDate, endDate, sortBy, sortOrder }) => ({
        url: "asteroids",
        params: { startDate, endDate, sortBy, sortOrder },
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetAsteroidsQuery } = asteroidsApi;

/**
 * For fetching from server side only.
 */
export const getAsteroids = async ({
  startDate,
  endDate,
  sortBy,
  sortOrder,
}: {
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: string;
}) => {
  try {
    const { data: response } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/asteroids`,
      {
        params: {
          startDate,
          endDate,
          sortBy,
          sortOrder,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * For fetching from server side only.
 */
export const getAsteroid = async (id: string) => {
  try {
    const { data: response } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/asteroids/${id}`
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
