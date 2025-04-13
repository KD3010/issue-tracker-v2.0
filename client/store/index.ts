import { createReducer, createAction, type PayloadAction } from "@reduxjs/toolkit";

export interface IInitialState {
    isSidebarCollapsed: boolean,
    isDarkMode: boolean,
    currentWorkspace: Number
}

export const initialState: IInitialState = {
    isSidebarCollapsed: false,
    isDarkMode: false,
    currentWorkspace: 6
}

const setIsSidebarCollapsed = createAction<boolean>('setIsSidebarCollapsed');
const setIsDarkMode = createAction<boolean>('setIsDarkMode');
const setWorkspace = createAction<Number>('setWorkspace');

const globalReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setIsSidebarCollapsed, (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        })
        .addCase(setIsDarkMode, (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        })
        .addCase(setWorkspace, (state, action: PayloadAction<Number>) => {
            state.currentWorkspace = action.payload;
        })
})

export {
    setIsDarkMode,
    setIsSidebarCollapsed,
    setWorkspace
}

export default globalReducer;
