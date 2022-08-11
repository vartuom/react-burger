import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        data: [],
        total: 0,
        totalToday: 0,
        hasError: false,
        connected: false,
        isPending: false
    },
    reducers: {
        wsConnectionInit(state) {
            state.isPending = true;
        },
        wsConnectionOK(state) {
            state.connected = true;
            state.hasError = false;
            state.isPending = false;
        },
        wsConnectionError(state) {
            state.connected = false;
            state.hasError = true;
            state.data = [];
            state.isPending = false;
        },
        wsConnectionClosed(state) {
            state.connected = false;
            state.hasError = false;
        },
        wsOnMessage(state, action) {
            state.data = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    }
})

export const wsActions = feedSlice.actions;
export default feedSlice.reducer;