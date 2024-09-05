import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./LocalStorageServices";

const createHeaders = (isAuthRequired = false, contentType: string = "application/json") => {
  const headers: HeadersInit = { "Content-type": contentType };
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
  .filter(([_, value]) => value !== undefined && value !== null && value !== "")
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
    allUsers: builder.query({
      query: ({username, search, rowsperpage, page, exclude_by}) => ({
        url: `api/accounts/admin-users/${username ? `by-username/${username}/` : ""}${buildQueryParams({ search, page_size: rowsperpage, page, exclude_by })}`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),        
    getLoggedUser: builder.query({
      query: () => ({
        url: "api/accounts/users/me/",
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
      query: ( actualData ) => {
        const { access_token } = getToken();
        return {
          url: "api/products/products/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
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
      query: ({product_id}) => ({
        url: `api/products/recommendations/${product_id ? `?product_id=${product_id}` : ""}`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
    notifyuser: builder.mutation({
      query: (actualData) => ({
        url: "api/products/notifyuser/",
        method: "POST",
        body :actualData,
        headers: createHeaders(true),
      }),
    }),
    getnotifyuser: builder.query({
      query: ({product,variant}) => ({
        url: `api/products/notifyuser/${buildQueryParams({ product, variant})}`,
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
      query: ({id}) => ({
        url: `api/products/cart/${id}/`,
        method: "PATCH",
        headers: createHeaders(true),
      }),
    }),
    cartDelete: builder.mutation({
      query: ({id}) => ({
        url: `api/products/cart/${id}/`,
        method: "DELETE",         
        headers: createHeaders(true),
      }),
    }),
    searchPost: builder.mutation({
      query: ({actualData}) => {
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
    getlayout: builder.query({
      query: ({layoutslug}) => ({
        url: `api/layout/layouts/${layoutslug ? `${layoutslug}/` : ""}`,
        method: "GET",
        headers: createHeaders(true),
      }),
    }),
    createorUpdatelayout: builder.mutation({
      query : ({layoutslug, NewFormData}) =>{
        const { access_token } = getToken();
        return {
          url: `api/layout/layouts/${layoutslug}/`,
          method: "PATCH",
          body: NewFormData ,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      }
    }),    
    updateLayoutCard : builder.mutation({
      query:({formData, layoutslug, id}) => ({
        url: `api/layout/layouts/${layoutslug ? `${layoutslug}/` : ""}`,
        method: "PATCH",
        body: formData,
        headers : createHeaders(true)
      })
    })
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserDeviceMutation,
  useAllUsersQuery,
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
  useUpdateLayoutCardMutation,
} = userAuthapi;
