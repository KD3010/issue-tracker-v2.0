"use client";
import React, { useRef, type ReactNode } from 'react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore, Provider } from 'react-redux'
import globalReducer from '@/store'
import { persistReducer, persistStore } from "redux-persist";
import { api } from '@/store/api';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { PersistGate } from 'redux-persist/integration/react';

const createNoopStorage = () => {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string): Promise<string> {
      return Promise.resolve(value);
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage = typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");

const persistConfig = {
  key: "global",
  storage,
}

const persistedGlobalReducer = persistReducer(persistConfig, globalReducer)

const rootReducer = combineReducers({
  global: persistedGlobalReducer,
  [api.reducerPath]: api.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        'persist/PERSIST',
        'persist/REHYDRATE',
        'persist/FLUSH',
        'persist/PAUSE',
        'persist/PURGE',
        'persist/REGISTER',
      ],
    },
  }).concat(api.middleware),
});

const persistor = persistStore(store);

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore>();
    if(!storeRef.current) {
        storeRef.current = store;
    }
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider;