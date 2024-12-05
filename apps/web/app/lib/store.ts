import { configureStore } from "@reduxjs/toolkit";
import { asteroidsApi } from "./asteroids-api";
import { asteroidsReducer } from "./asteroids-slice";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
  reducer: {
    [asteroidsApi.reducerPath]: asteroidsApi.reducer,
    asteroids: asteroidsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asteroidsApi.middleware),
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
