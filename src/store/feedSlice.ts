import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, createSlice} from "@reduxjs/toolkit";
import {TOrder} from "../types/types";

interface IInitialState {
    data: Array<TOrder>,
    total: number,
    totalToday: number,
    hasError: boolean,
    connected: boolean,
    isPending: boolean,
    isOpened: boolean
}

const initialState: IInitialState = {
    data: [],
    total: 0,
    totalToday: 0,
    hasError: false,
    connected: false,
    isPending: false,
    isOpened: false
}

const feedSlice = createSlice({
    name: 'feed',
    initialState: initialState,
    reducers: {
        wsConnectionInit(state, payload) {
            state.isPending = true;
        },
        wsConnectionOK(state) {
            state.connected = true;
            state.hasError = false;
            state.isPending = false;
        },
        wsConnectionError(state, payload) {
            state.connected = false;
            state.hasError = true;
            state.data = [];
            state.isPending = false;
        },
        wsConnectionClose(state) {
            state.connected = false;
            state.hasError = false;
        },
        wsOnMessage(state, action) {
            state.data = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
        setOrdersModalOpened(state) {
            state.isOpened = true;
        },
        setOrdersModalClosed(state) {
            state.isOpened = false;
        }
    }
})

export interface IwsActions {
    wsConnectionInit: ActionCreatorWithPayload<string, string>,
    wsConnectionOK: ActionCreatorWithoutPayload<string>,
    wsConnectionError: ActionCreatorWithPayload<string, string>,
    wsConnectionClose: ActionCreatorWithoutPayload<string>,
    wsOnMessage: ActionCreatorWithPayload<unknown, string>
}

export const wsActions = feedSlice.actions;
export default feedSlice.reducer;