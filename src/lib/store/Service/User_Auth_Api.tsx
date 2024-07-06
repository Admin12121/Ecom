import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./LocalStorageServices";

export const userAuthapi = createApi({
  reducerPath: "userAuthapi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}` }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "api/accounts/users/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "api/accounts/users/login/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    userdevice: builder.mutation({
      query: (user) => {
        const {access_token} = getToken();
        return {
          url: "api/accounts/users/device/",
          method: "POST",
          body: user,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    getLoggedUser: builder.query({
      query: () => {
        const {access_token} = getToken();
        return {
          url: "accounts/profile/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    getUserProfile: builder.query({
      query: ({  username }) => {
        const  { access_token }  = getToken();
        return {
          url: `accounts/users/?name=${username}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    updateUserProfile: builder.mutation({
      query: ({ NewFormData, id }) => {
        const  { access_token }  = getToken();
        return {
          url: `accounts/profile/?id=${id}`,
          method: "PATCH",
          body: NewFormData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData }) => {
        const  { access_token }  = getToken();
        return {
          url: "accounts/changepassword/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: "accounts/send-reset-password-email/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `accounts/reset-password/${id}/${token}/`,
          method: "POST",
          body: actualData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    registration: builder.mutation({
      query: (actualData) => {
        return {
          url: `accounts/registration/`,
          method: "POST",
          body: actualData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    refreshaccess_tokenToken: builder.mutation({
      query: (refreshToken) => {
        return {
          url: "accounts/token/refresh/",
          method: "POST",
          body: refreshToken, // Fix: Pass the object directly
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    storeRegistration: builder.mutation({
      query: ({ formData }) => {
        const { access_token } = getToken();
        return {
          url: "store/register_store/",
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    getStaffUser: builder.query({
      query: (storeCode) => {
        const { access_token } = getToken();
        return {
          url: `accounts/users/?store=${storeCode}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    productsRegistration: builder.mutation({
      query: ( actualData ) => {
        const { access_token } = getToken();
        return {
          url: "products/products/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    productsView: builder.query({
      query: ({storeCode,id}) => {
        const { access_token } = getToken();
        return {
          url: `products/products/?store=${storeCode}${id ? `&id=${id}`: ""}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    lowstockproductsView: builder.query({
      query: ({storeCode}) => {
        const { access_token } = getToken();
        return {
          url: `products/lowstockproducts/?store=${storeCode}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    updatelowstockproducts: builder.mutation({
      query: ({actualData, id, varient}) => {
        console.log(varient)
        const { access_token } = getToken();
        return {
          url: `products/lowstockproducts/?${varient ? `varient=data&` : ""}id=${id}`,
          method: "PATCH",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    expiredproductsView: builder.query({
      query: ({storeCode}) => {
        const { access_token } = getToken();
        return {
          url: `products/expiredproducts/?store=${storeCode}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    deleteproducts: builder.mutation({
      query: (id) => {
        const { access_token } = getToken();
        return {
          url: `products/products/?id=${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    categoryView: builder.query({
      query: () => {
        return {
          url: `api/products/categories/`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    addCategory: builder.mutation({
      query: (actualData) => {
        const { access_token } = getToken();
        return {
          url: `api/products/categories/`,
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    upgradeCategory: builder.mutation({
      query: ({NewFormData,id}) => {
        const { access_token } = getToken();
        return {
          url: `products/category/?id=${id}`,
          method: "PATCH",
          body: NewFormData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        const { access_token } = getToken();
        return {
          url: `products/category/?id=${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    subCategoryView: builder.query({
      query: (storeCode) => {
        const { access_token } = getToken();
        return {
          url: `products/subcategory/?store=${storeCode}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    AddsubCategory: builder.mutation({
      query: (actualData) => {
        const { access_token } = getToken();
        return {
          url: `api/products/subcategories/`,
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    deletesubCategory: builder.mutation({
      query: (id) => {
        const { access_token } = getToken();
        return {
          url: `products/subcategory/?id=${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    upgradesubCategory: builder.mutation({
      query: ({NewFormData,id}) => {
        const { access_token } = getToken();
        return {
          url: `products/subcategory/?id=${id}`,
          method: "PATCH",
          body: NewFormData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    subsubCategoryView: builder.query({
      query: (storeCode) => {
        const { access_token } = getToken();
        return {
          url: `products/subsubcategory/?store=${storeCode}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    AddsubsubCategory: builder.mutation({
      query: (actualData) => {
        const { access_token } = getToken();
        return {
          url: `products/subsubcategory/`,
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    deletesubsubCategory: builder.mutation({
      query: (id) => {
        const { access_token } = getToken();
        return {
          url: `products/subsubcategory/?id=${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    upgradesubsubCategory: builder.mutation({
      query: ({NewFormData,id}) => {
        const { access_token } = getToken();
        return {
          url: `products/subsubcategory/?id=${id}`,
          method: "PATCH",
          body: NewFormData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    brandView: builder.query({
      query: (storeCode) => {
        const { access_token } = getToken();
        return {
          url: `products/brand/?store=${storeCode}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    AddBrand: builder.mutation({
      query: (actualData) => {
        const { access_token } = getToken();
        return {
          url: `products/brand/`,
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    UpdateBrand: builder.mutation({
      query: ({NewFormData,id}) => {
        const { access_token } = getToken();
        return {
          url: `products/brand/?id=${id}`,
          method: "PATCH",
          body: NewFormData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    DeleteBrand: builder.mutation({
      query: (id) => {
        const { access_token } = getToken();
        return {
          url: `products/brand/?id=${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    foreignkeyView: builder.query({
      query: (storeCode) => {
        const { access_token } = getToken();
        return {
          url: `products/foreignkey/?store=${storeCode}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    customerView: builder.query({
      query: (storeCode) => {
        const { access_token } = getToken();
        return {
          url: `store/customers/?store=${storeCode}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    Addcustomer: builder.mutation({
      query: (actualData) => {
        const { access_token } = getToken();
        return {
          url: `store/customers/`,
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    Updatecustomer: builder.mutation({
      query: ({NewFormData,id}) => {
        const { access_token } = getToken();
        return {
          url: `store/customers/?id=${id}`,
          method: "PATCH",
          body: NewFormData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    Deletecustomer: builder.mutation({
      query: (id) => {
        const { access_token } = getToken();
        return {
          url: `store/customers/?id=${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    RedeemCodeView: builder.mutation({
      query: ({storeCode,code}) => {
        const { access_token } = getToken();
        return {
          url: `sales/redeemcode/?store=${storeCode}${code ? `&code=${code}` : '' }`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    AddRedeemCode: builder.mutation({
      query: (actualData) => {
        const { access_token } = getToken();
        return {
          url: `sales/redeemcode/`,
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    UpdateRedeemCode: builder.mutation({
      query: ({NewFormData,id}) => {
        const { access_token } = getToken();
        return {
          url: `sales/redeemcode/?id=${id}`,
          method: "PATCH",
          body: NewFormData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    DeleteRedeemCode: builder.mutation({
      query: (id) => {
        const { access_token } = getToken();
        return {
          url: `sales/redeemcode/?id=${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    AddInvoice: builder.mutation({
      query: (actualData) => {
        const { access_token } = getToken();
        return {
          url: `sales/sales/`,
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    GetInvoiceData: builder.query({
      query: (storeCode) => {
        const { access_token } = getToken();
        return {
          url: `sales/sales/?store=${storeCode}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    dailyInvoiceData: builder.query({
      query: (storeCode) => {
        const { access_token } = getToken();
        return {
          url: `sales/sales/?store=${storeCode}&current=current_date`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    dailyHoldInvoiceData: builder.query({
      query: (storeCode) => {
        const { access_token } = getToken();
        return {
          url: `sales/sales/?store=${storeCode}&hold=current_date`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    creditsData: builder.query({
      query: ({storeCode,code}) => {
        const { access_token } = getToken();
        return {
          url: `sales/credits/?store=${storeCode}${code ? `&code=${code}` : ``}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    ClearCredit: builder.mutation({
      query: ({actualData,id}) => {
        const { access_token } = getToken();
        return {
          url: `sales/sales/?id=${id}`,
          method: "PATCH",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserdeviceMutation,
  useGetLoggedUserQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangeUserPasswordMutation,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
  useRegistrationMutation,
  useRefreshaccess_tokenTokenMutation,
  useStoreRegistrationMutation,
  useGetStaffUserQuery,
  useProductsRegistrationMutation,
  useProductsViewQuery,
  useLowstockproductsViewQuery,
  useUpdatelowstockproductsMutation,
  useExpiredproductsViewQuery,
  useDeleteproductsMutation,
  useCategoryViewQuery,
  useAddCategoryMutation,
  useUpgradeCategoryMutation,
  useDeleteCategoryMutation,
  useSubCategoryViewQuery,
  useAddsubCategoryMutation, 
  useDeletesubCategoryMutation, 
  useUpgradesubCategoryMutation,
  useSubsubCategoryViewQuery,
  useAddsubsubCategoryMutation, 
  useDeletesubsubCategoryMutation, 
  useUpgradesubsubCategoryMutation,
  useBrandViewQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useForeignkeyViewQuery,
  useCustomerViewQuery,
  useAddcustomerMutation,
  useUpdatecustomerMutation,
  useDeletecustomerMutation,
  useRedeemCodeViewMutation,
  useAddRedeemCodeMutation,
  useDeleteRedeemCodeMutation,
  useUpdateRedeemCodeMutation,
  useAddInvoiceMutation,
  useGetInvoiceDataQuery,
  useDailyInvoiceDataQuery,
  useDailyHoldInvoiceDataQuery,
  useCreditsDataQuery,
  useClearCreditMutation,
} = userAuthapi;
