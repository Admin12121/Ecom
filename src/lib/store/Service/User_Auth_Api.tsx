import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./LocalStorageServices";

const createHeaders = (isAuthRequired = false) => {
  const headers: HeadersInit = { "Content-type": "application/json" };
  if (isAuthRequired) {
    const { access_token } = getToken();
    if (access_token) {
      headers["authorization"] = `Bearer ${access_token}`;
    }
  }
  return headers;
};

const buildQueryParams = (params: Record<string, string | number | undefined>) => {
  const queryParams = Object.entries(params)
  .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return queryParams ? `?${queryParams}` : "";
};

export const userAuthapi = createApi({
  reducerPath: "userAuthapi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}` }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "api/accounts/users/",
        method: "POST",
        body: user,
        headers: createHeaders(),
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "api/accounts/users/login/",
        method: "POST",
        body: user,
        headers: createHeaders(),
      }),
    }),
    userDevice: builder.mutation({
      query: (user) => ({
        url: "api/accounts/users/device/",
        method: "POST",
        body: user,
        headers: createHeaders(true),
      }),
    }),
    getLoggedUser: builder.query({
      query: () => ({
        url: "accounts/profile/",
        method: "GET",
        headers: createHeaders(true),
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
    sendPasswordResetEmail: builder.mutation({
      query: (user) => ({
        url: "accounts/send-reset-password-email/",
        method: "POST",
        body: user,
        headers: createHeaders(),
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => ({
        url: `accounts/reset-password/${id}/${token}/`,
        method: "POST",
        body: actualData,
        headers: createHeaders(),
      }),
    }),
    registration: builder.mutation({
      query: (actualData) => ({
        url: "accounts/registration/",
        method: "POST",
        body: actualData,
        headers: createHeaders(),
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
      query: (actualData) => ({
        url: "api/products/products/",
        method: "POST",
        body: actualData,
        headers: createHeaders(true),
      }),
    }),
    productsView: builder.query({
      query: ({ productslug, id, search, ids, category }) => {
        const queryParams = buildQueryParams({ productslug, id, search, ids, category });
        return {
          url: `api/products/products/${queryParams}`,
          method: "GET",
          headers: createHeaders(),
        };
      },
    }),
    recommendedProductsView: builder.query({
      query: () => ({
        url: "api/products/recommendations/",
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/products/?id=${id}`,
        method: "DELETE",
        headers: createHeaders(true),
      }),
    }),
    categoryView: builder.query({
      query: () => ({
        url: "api/products/categories/",
        method: "GET",
        headers: createHeaders(),
      }),
    }),
    addCategory: builder.mutation({
      query: (actualData) => ({
        url: "api/products/categories/",
        method: "POST",
        body: actualData,
        headers: createHeaders(true),
      }),
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
        url: `sales/redeemcode/?store=${storeCode}${code ? `&code=${code}` : ""}`,
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
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserDeviceMutation,
  useGetLoggedUserQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangeUserPasswordMutation,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
  useRegistrationMutation,
  useRefreshTokenMutation,
  useProductsRegistrationMutation,
  useProductsViewQuery,
  useRecommendedProductsViewQuery,
  useDeleteProductMutation,
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
} = userAuthapi;
