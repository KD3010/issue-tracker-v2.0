import { createReducer, createAction, type PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
    isSidebarCollapsed: boolean,
    isDarkMode: boolean
}

export const initialState: IInitialState = {
    isSidebarCollapsed: false,
    isDarkMode: false
}

const setIsSidebarCollapsed = createAction<boolean>('setIsSidebarCollapsed');
const setIsDarkMode = createAction<boolean>('setIsDarkMode');

const globalReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setIsSidebarCollapsed, (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        })
        .addCase(setIsDarkMode, (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        })
})

export {
    setIsDarkMode,
    setIsSidebarCollapsed
}

export default globalReducer;
