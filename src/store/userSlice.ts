import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from "../utils/constants";
import {getCookie, setCookie} from "../utils/storage";
import {checkResponse, fetchWithRefresh} from "../utils/api";
import {cookiesLifeTime} from "../utils/constants";

type TAuthData = {
    email: string,
    username?: string,
    password?: string
}
export const fetchRegUser = createAsyncThunk(
    'user/fetchRegUser',
    async function (data:TAuthData, {rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    name: data.username
                })
            });
            const actualData = await checkResponse(response);
            return actualData;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const fetchLogIn = createAsyncThunk(
    'user/fetchLogIn',
    async function (data: TAuthData, {rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });
            const actualData = await checkResponse(response);
            return actualData;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const fetchLogOut = createAsyncThunk(
    'user/fetchLogOut',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // your expected POST request payload goes here
                    token: localStorage.getItem('refreshToken')
                })
            });
            const actualData = await checkResponse(response);
            return actualData;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const fetchGetUserData = createAsyncThunk(
    'user/fetchGetUserData',
    async function (_, {rejectWithValue}) {
        try {
            const userData = await fetchWithRefresh(`${baseUrl}/auth/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getCookie('accessToken')
                }
            });
            return userData;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const fetchPatchUserData = createAsyncThunk(
    'user/fetchPatchUserData',
    async function (data: TAuthData, {rejectWithValue}) {
        try {
            const userData = await fetchWithRefresh(`${baseUrl}/auth/user`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getCookie('accessToken')
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    name: data.username
                })
            });
            return userData;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

interface IInitialState {
    isAuthPending: boolean,
    isLoggedIn: boolean,
    user: {
        email: string,
        name: string
    }
}

const initialState: IInitialState = {
    isAuthPending: false,
    isLoggedIn: false,
    user: {
        email: '',
        name: ''
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegUser.fulfilled, (state, action) => {
                state.isAuthPending = false;
                state.isLoggedIn = true;
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
                const accessToken = action.payload.accessToken.split('Bearer ')[1];
                setCookie('accessToken', accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(fetchRegUser.pending, (state) => {
                state.isAuthPending = true;
            })
            .addCase(fetchRegUser.rejected, (state) => {
                state.isAuthPending = false;
                state.isLoggedIn = false;
                state.user.email = '';
                state.user.name = '';
            })
            .addCase(fetchLogIn.fulfilled, (state, action) => {
                state.isAuthPending = false;
                state.isLoggedIn = true;
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
                const accessToken = action.payload.accessToken.split('Bearer ')[1];
                setCookie('accessToken', accessToken, {expires: cookiesLifeTime});
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(fetchLogIn.pending, (state) => {
                state.isAuthPending = true;
            })
            .addCase(fetchLogIn.rejected, (state) => {
                state.isAuthPending = false;
                state.isLoggedIn = false;
                state.user.email = '';
                state.user.name = '';
            })
            .addCase(fetchGetUserData.fulfilled, (state, action) => {
                state.isAuthPending = false;
                state.isLoggedIn = true;
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
            })
            .addCase(fetchGetUserData.pending, (state) => {
                state.isAuthPending = true;
            })
            .addCase(fetchGetUserData.rejected, (state) => {
                state.isAuthPending = false;
                state.isLoggedIn = false;
                state.user.email = '';
                state.user.name = '';
            })
            .addCase(fetchPatchUserData.fulfilled, (state, action) => {
                state.isAuthPending = false;
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
            })
            .addCase(fetchPatchUserData.pending, (state) => {
                state.isAuthPending = true;
            })
            .addCase(fetchPatchUserData.rejected, (state) => {
                state.isAuthPending = false;
            })
            .addCase(fetchLogOut.fulfilled, (state) => {
                state.isAuthPending = false;
                state.isLoggedIn = false;
                state.user.email = '';
                state.user.name = '';
                setCookie('accessToken', null, {expires: -1});
                localStorage.removeItem('refreshToken');
            })
            .addCase(fetchLogOut.pending, (state) => {
                state.isAuthPending = true;
            })
            .addCase(fetchLogOut.rejected, (state) => {
                state.isAuthPending = false;
            })

    }
});

export default userSlice.reducer;