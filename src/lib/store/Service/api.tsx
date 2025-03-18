import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "http";

const createHeaders = (
  token?: string,
  contentType: string = "application/json"
) => {
  const headers: HeadersInit = { "Content-type": contentType };
  if (token) {
    headers["authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const buildQueryParams = (
  params: Record<string, string | number | string[] | undefined>
) => {
  const queryParams = Object.entries(params)
    .filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== 0 &&
        !(Array.isArray(value) && value.length === 0)
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
  tagTypes: ["LoggedUser"],
  endpoints: (builder) => ({
    userDevice: builder.mutation({
      query: (user) => ({
        url: "api/accounts/users/device/",
        method: "POST",
        body: user,
        headers: createHeaders(),
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
          headers: createHeaders(token),
        };
      },
    }),
    getLoggedUser: builder.query({
      query: ({ token }) => ({
        url: "api/accounts/users/me/",
        method: "GET",
        headers: createHeaders(token),
      }),
      providesTags: [{ type: "LoggedUser", id: "ME" }],
      keepUnusedDataFor: Infinity,
    }),
    getUserProfile: builder.query({
      query: ({ username }) => ({
        url: `api/accounts/users/?name=${username}`,
        method: "GET",
        headers: createHeaders(),
      }),
    }),
    updateUserProfile: builder.mutation({
      query: ({ NewFormData, token }) => ({
        url: `api/accounts/users/12/`,
        method: "PATCH",
        body: NewFormData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData }) => ({
        url: "api/accounts/changepassword/",
        method: "POST",
        body: actualData,
        headers: createHeaders(),
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "api/accounts/token/refresh/",
        method: "POST",
        body: refreshToken,
        headers: createHeaders(),
      }),
    }),
    productsRegistration: builder.mutation({
      query: ({ formData, token }) => {
        return {
          url: "api/products/products/",
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    productsUpdate: builder.mutation({
      query: ({ formData, token, id }) => {
        return {
          url: `api/products/products/${id}/`,
          method: "PATCH",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    productImage: builder.mutation({
      query: ({ formData, token, id }) => {
        return {
          url: `api/products/product-images/${id}/`,
          method: "PATCH",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteproductImage: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `api/products/product-images/${id}/`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    variantUpdate: builder.mutation({
      query: ({ token, actualData }) => {
        return {
          url: `api/products/product-variants/${actualData.id}/`,
          method: "PATCH",
          body: actualData,
          headers: createHeaders(token),
        };
      },
    }),
    variantDelete: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `api/products/product-variants/${id}/`,
          method: "DELETE",
          headers: createHeaders(token),
        };
      },
    }),
    productsView: builder.query({
      query: ({
        productslug,
        id,
        search,
        page,
        ids,
        category,
        subcategory,
        min_price,
        max_price,
        color,
        size,
        metal,
        stock,
        filter,
        token,
        page_size,
      }) => {
        const queryParams = buildQueryParams({
          page,
          page_size,
          productslug,
          id,
          search,
          ids,
          category,
          subcategory,
          min_price,
          max_price,
          color,
          size,
          metal,
          stock,
          filter,
        });
        return {
          url: `api/products/products/${queryParams}`,
          method: "GET",
          headers: createHeaders(token),
        };
      },
    }),
    productsByIds: builder.query({
      query: ({ ids, all }) => ({
        url: `api/products/get_products_by_ids/?ids=${ids}${
          all ? "&all=true" : ""
        }`,
        method: "GET",
        headers: createHeaders(),
      }),
    }),
    checkout_products: builder.query({
      query: ({ ids, all, token }) => ({
        url: `api/products/products/checkout_products/?ids=${ids}${
          all ? "&all=true" : ""
        }`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    recommendedProductsView: builder.query({
      query: ({ product_id, token }) => ({
        url: `api/products/recommendations/${
          product_id ? `?product_id=${product_id}` : ""
        }`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    trendingProductsView: builder.query({
      query: () => ({
        url: "api/products/trending/",
        method: "GET",
        headers: createHeaders(),
      }),
    }),
    deleteProducts: builder.mutation({
      query: ({ token, id }) => ({
        url: `api/products/products/${id}/`,
        method: "DELETE",
        headers: createHeaders(token),
      }),
    }),
    notifyuser: builder.mutation({
      query: ({ actualData, token }) => ({
        url: "api/products/notifyuser/",
        method: "POST",
        body: actualData,
        headers: createHeaders(token),
      }),
    }),
    getnotifyuser: builder.query({
      query: ({ product, variant, token }) => ({
        url: `api/products/notifyuser/${buildQueryParams({
          product,
          variant,
        })}`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `api/products/products/?id=${id}`,
        method: "DELETE",
        headers: createHeaders(),
      }),
    }),
    cartView: builder.query({
      query: ({ token }) => ({
        url: `api/products/cart/`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    cartPost: builder.mutation({
      query: ({ actualData, token }) => ({
        url: `api/products/cart/`,
        method: "POST",
        body: actualData,
        headers: createHeaders(token),
      }),
    }),
    cartUpdate: builder.mutation({
      query: ({ actualData, token }) => ({
        url: `api/products/cart/12/`,
        method: "PATCH",
        body: actualData,
        headers: createHeaders(token),
      }),
    }),
    cartDelete: builder.mutation({
      query: ({ id, variantId, token }) => {
        return {
          url: `api/products/cart/${id}/variant/${variantId}/`,
          method: "DELETE",
          headers: createHeaders(token),
        };
      },
    }),
    clearCart: builder.mutation({
      query: ({ token }) => ({
        url: "api/products/clearcart/",
        method: "DELETE",
        headers: createHeaders(token),
      }),
    }),
    searchPost: builder.mutation({
      query: ({ actualData }) => {
        return {
          url: `api/accounts/search/`,
          method: "POST",
          body: actualData,
          headers: createHeaders(),
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
    getCategory: builder.query({
      query: ({ name }) => ({
        url: `api/products/get_category/${buildQueryParams({ name })}`,
        method: "GET",
        headers: createHeaders(),
      }),
    }),
    addCategory: builder.mutation({
      query: ({ formData, token }) => {
        return {
          url: "api/products/categories/",
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    upgradeCategory: builder.mutation({
      query: ({ formData, id, token }) => ({
        url: `api/products/categories/${id}/`,
        method: "PATCH",
        body: formData,
        headers: createHeaders(token),
      }),
    }),
    deleteCategory: builder.mutation({
      query: ({ id, token }) => ({
        url: `api/products/categories/${id}/`,
        method: "DELETE",
        headers: createHeaders(token),
      }),
    }),
    getSubCategory: builder.query({
      query: ({ name, category }) => ({
        url: `api/products/get_subcategory/${buildQueryParams({
          name,
          category,
        })}`,
        method: "GET",
        headers: createHeaders(),
      }),
    }),
    subCategoryView: builder.query({
      query: (storeCode) => ({
        url: `products/subcategory/?store=${storeCode}`,
        method: "GET",
        headers: createHeaders(),
      }),
    }),
    addSubCategory: builder.mutation({
      query: ({ formData, token }) => ({
        url: "api/products/subcategories/",
        method: "POST",
        body: formData,
        headers: createHeaders(token),
      }),
    }),
    deleteSubCategory: builder.mutation({
      query: ({ id, token }) => ({
        url: `api/products/subcategories/${id}/`,
        method: "DELETE",
        headers: createHeaders(token),
      }),
    }),
    upgradeSubCategory: builder.mutation({
      query: ({ formData, id, token }) => ({
        url: `api/products/subcategories/${id}/`,
        method: "PATCH",
        body: formData,
        headers: createHeaders(token),
      }),
    }),
    redeemCodeView: builder.query({
      query: ({ token }) => ({
        url: `api/sales/redeemcode/`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    verifyRedeemCode: builder.mutation({
      query: ({ code, token }) => ({
        url: `api/sales/redeemcode/verify-code/`,
        method: "POST",
        body: code,
        headers: createHeaders(token),
      }),
    }),
    addRedeemCode: builder.mutation({
      query: ({ actualData, token }) => ({
        url: "api/sales/redeemcode/",
        method: "POST",
        body: actualData,
        headers: createHeaders(token),
      }),
    }),
    updateRedeemCode: builder.mutation({
      query: ({ actualData, token }) => ({
        url: `api/sales/redeemcode/${actualData.id}/`,
        method: "PATCH",
        body: actualData,
        headers: createHeaders(token),
      }),
    }),
    deleteRedeemCode: builder.mutation({
      query: ({ id, token }) => ({
        url: `api/sales/redeemcode/${id}/`,
        method: "DELETE",
        headers: createHeaders(token),
      }),
    }),
    getlayout: builder.query({
      query: ({ layoutslug }) => ({
        url: `api/layout/layouts/${layoutslug ? `${layoutslug}/` : ""}`,
        method: "GET",
        headers: createHeaders(),
      }),
    }),
    createorUpdatelayout: builder.mutation({
      query: ({ layoutslug, NewFormData, token }) => {
        return {
          url: `api/layout/layouts/${layoutslug}/`,
          method: "PATCH",
          body: NewFormData,
          headers: createHeaders(token),
        };
      },
    }),
    postReview: builder.mutation({
      query: ({ actualData, token }) => {
        return {
          url: "api/products/reviews/post/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updateReview: builder.mutation({
      query: ({ FormData, id, token }) => ({
        url: `api/products/reviews-update/${id}/`,
        method: "PATCH",
        body: FormData,
        headers: createHeaders(token),
      }),
    }),
    deleteReview: builder.mutation({
      query: ({ data, token, id }) => {
        return {
          url: `api/products/reviews/post/${id}/`,
          method: "DELETE",
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
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
        headers: createHeaders(),
      }),
    }),
    getUserReview: builder.query({
      query: ({ token, search, page, page_size, star, filter }) => ({
        url: `api/products/reviews/user/${buildQueryParams({
          page,
          page_size,
          star,
          filter,
          search,
        })}`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    postSale: builder.mutation({
      query: ({ actualData, token }) => ({
        url: `api/sales/sales/`,
        method: "POST",
        body: actualData,
        headers: createHeaders(token),
      }),
    }),
    getshipping: builder.query({
      query: ({ token }) => ({
        url: `api/accounts/shipping/`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    getdefaultshipping: builder.query({
      query: ({ token }) => ({
        url: `api/accounts/default-address/`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    shipping: builder.mutation({
      query: ({ actualData, token }) => ({
        url: `api/accounts/shipping/`,
        method: "POST",
        body: actualData,
        headers: createHeaders(token),
      }),
    }),
    updateshipping: builder.mutation({
      query: ({ actualData, token }) => ({
        url: `api/accounts/shipping/${actualData.id}/`,
        method: "PATCH",
        body: actualData,
        headers: createHeaders(token),
      }),
    }),
    deleteshipping: builder.mutation({
      query: ({ id, token }) => ({
        url: `api/accounts/shipping/${id}/`,
        method: "DELETE",
        headers: createHeaders(token),
      }),
    }),
    getOrders: builder.query({
      query: ({ token, status, search, rowsperpage, page }) => ({
        url: `api/sales/sales/${
          status ? `status/${status}/` : ""
        }${buildQueryParams({
          search,
          page_size: rowsperpage,
          page,
        })}`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    getStocks: builder.query({
      query: ({ token, search, page }) => ({
        url: `api/products/stocks/${buildQueryParams({ search, page })}`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    updateSale: builder.mutation({
      query: ({ actualData, token }) => ({
        url: `api/sales/sales/${actualData.id}/`,
        method: "PATCH",
        body: actualData,
        headers: createHeaders(token),
      }),
    }),
    salesRetrieve: builder.query({
      query: ({ transactionuid, token }) => ({
        url: `api/sales/sales/transaction/${transactionuid}/`,
        method: "GET",
        headers: createHeaders(token),
      }),
    }),
    esewahook: builder.mutation({
      query: ({ actualData, token }) => {
        return {
          url: `api/sales/esewa-webhook/`,
          method: "POST",
          body: actualData,
          headers: createHeaders(token),
        };
      },
    }),
    postnewsletter: builder.mutation({
      query: ({ actualData }) => {
        return {
          url: `api/accounts/newsletter/`,
          method: "POST",
          body: actualData,
          headers: createHeaders(),
        };
      },
    }),
    getnewsletter: builder.query({
      query: ({token, search, page}) => ({
        url: `api/accounts/newsletter/${buildQueryParams({search, page})}`,
        method: "GET",
        headers: createHeaders(token),
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
  useProductsUpdateMutation,
  useProductImageMutation,
  useDeleteproductImageMutation,
  useVariantUpdateMutation,
  useVariantDeleteMutation,
  useProductsViewQuery,
  useProductsByIdsQuery,
  useCheckout_productsQuery,
  useRecommendedProductsViewQuery,
  useTrendingProductsViewQuery,
  useDeleteProductsMutation,
  useNotifyuserMutation,
  useGetnotifyuserQuery,
  useDeleteProductMutation,
  useCartViewQuery,
  useCartPostMutation,
  useCartUpdateMutation,
  useCartDeleteMutation,
  useClearCartMutation,
  useSearchPostMutation,
  useCategoryViewQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpgradeCategoryMutation,
  useDeleteCategoryMutation,
  useGetSubCategoryQuery,
  useSubCategoryViewQuery,
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpgradeSubCategoryMutation,
  useRedeemCodeViewQuery,
  useVerifyRedeemCodeMutation,
  useAddRedeemCodeMutation,
  useDeleteRedeemCodeMutation,
  useUpdateRedeemCodeMutation,
  useGetlayoutQuery,
  useCreateorUpdatelayoutMutation,
  usePostReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewQuery,
  useGetUserReviewQuery,
  usePostSaleMutation,
  useGetshippingQuery,
  useGetdefaultshippingQuery,
  useShippingMutation,
  useUpdateshippingMutation,
  useDeleteshippingMutation,
  useGetOrdersQuery,
  useGetStocksQuery,
  useUpdateSaleMutation,
  useSalesRetrieveQuery,
  useEsewahookMutation,
  usePostnewsletterMutation,
  useGetnewsletterQuery,
} = userAuthapi;
