import { configureStore } from '@reduxjs/toolkit'
import { userAuthapi } from './Service/api'


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