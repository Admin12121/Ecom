import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthapi } from './Service/User_Auth_Api'


export const store = () =>{
  return  configureStore({
    reducer: {
      [userAuthapi.reducerPath]: userAuthapi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAuthapi.middleware),
  })
}

export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']