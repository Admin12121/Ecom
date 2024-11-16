import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authUser } from "@/hooks/use-auth-user";

const createHeaders = (
  isAuthRequired = false,
  contentType: string = "application/json"
) => {
  const headers: HeadersInit = { "Content-type": contentType };
  if (isAuthRequired) {
    const { accessToken } = authUser();
    if (accessToken) {
      headers["authorization"] = `Bearer ${accessToken}`;
    }
  }
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
    userDevice: builder.mutation({
      query: (user) => ({
        url: "api/accounts/users/device/",
        method: "POST",
        body: user,
        headers: createHeaders(true),
      }),
    }),
    allUsers: builder.query({
      query: ({ username, search, rowsperpage, page, exclude_by, token }) => {
        return {
          url: `api/accounts/admin-users/${
            username ? `by-username/${username}/` : ""
          }${buildQueryParams({
            search,
            page_size: rowsperpage,
            page,
            exclude_by,
          })}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getLoggedUser: builder.query({
      query: ({ token }) => ({
        url: "api/accounts/users/me/",
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserProfile: builder.query({
      query: ({ username }) => ({
        url: `accounts/users/?name=${username}`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
    updateUserProfile: builder.mutation({
      query: ({ NewFormData, id }) => ({
        url: `accounts/profile/?id=${id}`,
        method: "PATCH",
        body: NewFormData,
        headers: createHeaders(true),
      }),
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData }) => ({
        url: "accounts/changepassword/",
        method: "POST",
        body: actualData,
        headers: createHeaders(true),
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "accounts/token/refresh/",
        method: "POST",
        body: refreshToken,
        headers: createHeaders(),
      }),
    }),
    productsRegistration: builder.mutation({
      query: (actualData) => {
        const { accessToken } = authUser();
        return {
          url: "api/products/products/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
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
    productsByIds: builder.query({
      query: ({ ids }) => ({
        url: `api/products/get_products_by_ids/?ids=${ids}`,
        method: "GET",
        headers: createHeaders(),
      }),
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
    trendingProductsView: builder.query({
      query: () => ({
        url: "api/products/trending/",
        method: "GET",
        headers: createHeaders(),
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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `api/products/products/?id=${id}`,
        method: "DELETE",
        headers: createHeaders(true),
      }),
    }),
    cartView: builder.query({
      query: ({}) => ({
        url: `api/products/cart/`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
    cartPost: builder.mutation({
      query: (actualData) => ({
        url: `api/products/cart/`,
        method: "POST",
        body: actualData,
        headers: createHeaders(true),
      }),
    }),
    cartUpdate: builder.mutation({
      query: ({ id, actualData }) => ({
        url: `api/products/cart/${id}/`,
        method: "PATCH",
        body: actualData,
        headers: createHeaders(true),
      }),
    }),
    cartDelete: builder.mutation({
      query: ({ id }) => ({
        url: `api/products/cart/${id}/`,
        method: "DELETE",
        headers: createHeaders(true),
      }),
    }),
    searchPost: builder.mutation({
      query: ({ actualData }) => {
        console.log("actualData:", actualData); // Log actualData
        return {
          url: `api/accounts/search/`,
          method: "POST",
          body: actualData,
          headers: createHeaders(true),
        };
      },
    }),
    categoryView: builder.query({
      query: () => ({
        url: "api/products/categories/",
        method: "GET",
        headers: createHeaders(),
      }),
    }),
    addCategory: builder.mutation({
      query: ({ formData }) => {
        const { accessToken } = authUser();
        return {
          url: "api/products/categories/",
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    upgradeCategory: builder.mutation({
      query: ({ NewFormData, id }) => ({
        url: `products/category/?id=${id}`,
        method: "PATCH",
        body: NewFormData,
        headers: createHeaders(true),
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `products/category/?id=${id}`,
        method: "DELETE",
        headers: createHeaders(true),
      }),
    }),
    subCategoryView: builder.query({
      query: (storeCode) => ({
        url: `products/subcategory/?store=${storeCode}`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
    addSubCategory: builder.mutation({
      query: (actualData) => ({
        url: "api/products/subcategories/",
        method: "POST",
        body: actualData,
        headers: createHeaders(true),
      }),
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `products/subcategory/?id=${id}`,
        method: "DELETE",
        headers: createHeaders(true),
      }),
    }),
    upgradeSubCategory: builder.mutation({
      query: ({ NewFormData, id }) => ({
        url: `products/subcategory/?id=${id}`,
        method: "PATCH",
        body: NewFormData,
        headers: createHeaders(true),
      }),
    }),
    redeemCodeView: builder.query({
      query: ({ storeCode, code }) => ({
        url: `sales/redeemcode/?store=${storeCode}${
          code ? `&code=${code}` : ""
        }`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
    addRedeemCode: builder.mutation({
      query: (actualData) => ({
        url: "sales/redeemcode/",
        method: "POST",
        body: actualData,
        headers: createHeaders(true),
      }),
    }),
    updateRedeemCode: builder.mutation({
      query: ({ NewFormData, id }) => ({
        url: `sales/redeemcode/?id=${id}`,
        method: "PATCH",
        body: NewFormData,
        headers: createHeaders(true),
      }),
    }),
    deleteRedeemCode: builder.mutation({
      query: (id) => ({
        url: `sales/redeemcode/?id=${id}`,
        method: "DELETE",
        headers: createHeaders(true),
      }),
    }),
    getlayout: builder.query({
      query: ({ layoutslug }) => ({
        url: `api/layout/layouts/${layoutslug ? `${layoutslug}/` : ""}`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
    createorUpdatelayout: builder.mutation({
      query: ({ layoutslug, NewFormData }) => {
        const { accessToken } = authUser();
        return {
          url: `api/layout/layouts/${layoutslug}/`,
          method: "PATCH",
          body: NewFormData,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    postLayoutCard: builder.mutation({
      query: ({ formData, layoutslug, image_id, title_id, link_id, id }) => {
        let url = `api/layout/layouts/${layoutslug}/`;
        const { accessToken } = authUser();
        const headers: HeadersInit = {
          authorization: `Bearer ${accessToken}`,
        };
        if (image_id) {
          url += `${image_id}/image/`;
        } else {
          headers["Content-Type"] = "application/json"; // Only set this for JSON data
          if (title_id) {
            url += `${title_id}/title/`;
          } else if (link_id) {
            url += `${link_id}/link/`;
          }
        }
        return {
          url,
          method: "POST",
          body: formData, // Do not stringify formData
          headers,
        };
      },
    }),
    updateLayoutCard: builder.mutation({
      query: ({ formData, layoutslug, image_id, title_id, link_id, id }) => {
        let url = `api/layout/layouts/${layoutslug}/`;
        const { accessToken } = authUser();
        const headers: HeadersInit = {
          authorization: `Bearer ${accessToken}`,
        };
        if (image_id) {
          url += `image/${image_id}/`;
        } else {
          headers["Content-Type"] = "application/json"; // Only set this for JSON data
          if (title_id) {
            url += `title/${title_id}/`;
          } else if (link_id) {
            url += `link/${link_id}/`;
          } else if (id) {
            url += `activate/${id}/`;
          }
        }
        return {
          url,
          method: "PATCH",
          body: formData, // Do not stringify formData
          headers,
        };
      },
    }),
    postReview: builder.mutation({
      query: (actualData) => {
        const { accessToken } = authUser();
        return {
          url: "api/products/reviews/post/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    updateReview: builder.mutation({
      query: ({ NewFormData, id }) => ({
        url: `api/products/reviews/post/${id}/`,
        method: "PATCH",
        body: NewFormData,
        headers: createHeaders(true),
      }),
    }),
    getReview: builder.query({
      query: ({ product_slug, page, page_size, star, filter }) => ({
        url: `api/products/reviews/${product_slug}/data/${buildQueryParams({
          page,
          page_size,
          star,
          filter,
        })}`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
    postSale: builder.mutation({
      query: ({ actualData }) => ({
        url: `api/sales/sales/`,
        method: "POST",
        body: actualData,
        headers: createHeaders(true),
      }),
    }),
  }),
});

export const {
  useUserDeviceMutation,
  useAllUsersQuery,
  useGetLoggedUserQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangeUserPasswordMutation,
  useRefreshTokenMutation,
  useProductsRegistrationMutation,
  useProductsViewQuery,
  useProductsByIdsQuery,
  useRecommendedProductsViewQuery,
  useTrendingProductsViewQuery,
  useNotifyuserMutation,
  useGetnotifyuserQuery,
  useDeleteProductMutation,
  useCartViewQuery,
  useCartPostMutation,
  useCartUpdateMutation,
  useCartDeleteMutation,
  useSearchPostMutation,
  useCategoryViewQuery,
  useAddCategoryMutation,
  useUpgradeCategoryMutation,
  useDeleteCategoryMutation,
  useSubCategoryViewQuery,
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpgradeSubCategoryMutation,
  useRedeemCodeViewQuery,
  useAddRedeemCodeMutation,
  useDeleteRedeemCodeMutation,
  useUpdateRedeemCodeMutation,
  useGetlayoutQuery,
  useCreateorUpdatelayoutMutation,
  usePostLayoutCardMutation,
  useUpdateLayoutCardMutation,
  usePostReviewMutation,
  useUpdateReviewMutation,
  useGetReviewQuery,
  usePostSaleMutation,
} = userAuthapi;
