"use client";
import React, { useRef, type ReactNode } from 'react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore, Provider } from 'react-redux'
import globalReducer from '@/store'
import { api } from '@/store/api';

const rootReducer = combineReducers({
  globalReducer,
  [api.reducerPath]: api.reducer
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(api.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore>();
    if(!storeRef.current) {
        storeRef.current = makeStore();
    }
  return (
    <Provider store={storeRef.current}>{children}</Provider>
  )
}

export default StoreProvider;