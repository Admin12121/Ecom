import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface VideoUrlResponse {
  video_url: string;
}

const createHeaders = (
  isAuthRequired = false,
  contentType: string = "application/json"
) => {
  const headers: HeadersInit = { "Content-type": contentType };
  return headers;
};

const buildQueryParams = (
  params: Record<string, string | number | undefined>
) => {
  const queryParams = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return queryParams ? `?${queryParams}` : "";
};

export const userAuthapi = createApi({
  reducerPath: "userAuthapi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}`,
  }),
  endpoints: (builder) => ({
    productsView: builder.query({
      query: ({ productslug, id, search, ids, category }) => {
        const queryParams = buildQueryParams({
          productslug,
          id,
          search,
          ids,
          category,
        });
        return {
          url: `api/products/products/${queryParams}`,
          method: "GET",
          headers: createHeaders(),
        };
      },
    }),
    recommendedProductsView: builder.query({
      query: ({ product_id }) => ({
        url: `api/products/recommendations/${
          product_id ? `?product_id=${product_id}` : ""
        }`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
    notifyuser: builder.mutation({
      query: (actualData) => ({
        url: "api/products/notifyuser/",
        method: "POST",
        body: actualData,
        headers: createHeaders(true),
      }),
    }),
    getnotifyuser: builder.query({
      query: ({ product, variant }) => ({
        url: `api/products/notifyuser/${buildQueryParams({
          product,
          variant,
        })}`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
    getReview: builder.query({
      query: ({ product_slug, page, page_size, star, filter }) => (
        {
        url: `api/products/reviews/${product_slug}/data/${buildQueryParams({ page, page_size, star, filter })}`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
  }),
});

export const {
  useProductsViewQuery,
  useRecommendedProductsViewQuery,
  useNotifyuserMutation,
  useGetnotifyuserQuery,
  useGetReviewQuery,
} = userAuthapi;
