import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from "../utils/constants";
import {getCookie, setCookie} from "../utils/storage";
import {fetchWithRefresh} from "../utils/api";

export const fetchRegUser = createAsyncThunk(
    'user/fetchRegUser',
    async function (data, {rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // your expected POST request payload goes here
                    email: data.email,
                    password: data.password,
                    name: data.username
                })
            });
            if (!response.ok) {
                return rejectWithValue(response.status)
            }
            const actualData = await response.json();
            // enter you logic when the fetch is successful
            return actualData;
        } catch (error) {
            return rejectWithValue(error.status)
        }
    }
);

export const fetchLogIn = createAsyncThunk(
    'user/fetchLogIn',
    async function (data, {rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // your expected POST request payload goes here
                    email: data.email,
                    password: data.password
                })
            });
            if (!response.ok) {
                return rejectWithValue(response.status)
            }
            const actualData = await response.json();
            // enter you logic when the fetch is successful
            return actualData;
        } catch (error) {
            return rejectWithValue(error.status)
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
            if (!response.ok) {
                return rejectWithValue(response.status)
            }
            const actualData = await response.json();
            // enter you logic when the fetch is successful
            return actualData;
        } catch (error) {
            return rejectWithValue(error.status)
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
            return rejectWithValue(err.status);
        }
    }
)

export const fetchPathUserData = createAsyncThunk(
    'user/fetchPathUserData',
    async function (data, {rejectWithValue}) {
        try {
            const userData = await fetchWithRefresh(`${baseUrl}/auth/user`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getCookie('accessToken')
                },
                body: JSON.stringify({
                    // your expected POST request payload goes here
                    email: data.email,
                    password: data.password,
                    name: data.name
                })
            });
            return userData;
        } catch (err) {
            return rejectWithValue(err.status);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthPending: true,
        isLoggedIn: false,
        user: {
            email: '',
            name: ''
        }
    },
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
                console.log('login OK' + action.payload)
                state.isAuthPending = false;
                state.isLoggedIn = true;
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
                const accessToken = action.payload.accessToken.split('Bearer ')[1];
                setCookie('accessToken', accessToken, {expires: 3});
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(fetchLogIn.pending, (state) => {
                state.isAuthPending = true;
            })
            .addCase(fetchLogIn.rejected, (state, action) => {
                console.log('login attempt rejected ' + action.payload)
                state.isAuthPending = false;
                state.isLoggedIn = false;
                state.user.email = '';
                state.user.name = '';
            })
            .addCase(fetchGetUserData.fulfilled, (state, action) => {
                console.log('Get user OK')
                state.isAuthPending = false;
                state.isLoggedIn = true;
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
            })
            .addCase(fetchGetUserData.pending, (state) => {
                state.isAuthPending = true;
            })
            .addCase(fetchGetUserData.rejected, (state, action) => {
                console.log('Get user rejected ' + action.payload)
                state.isAuthPending = false;
                state.isLoggedIn = false;
                state.user.email = '';
                state.user.name = '';
            })
            .addCase(fetchPathUserData.fulfilled, (state, action) => {
                console.log('PATСH user OK')
                state.isAuthPending = false;
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
            })
            .addCase(fetchPathUserData.pending, (state, action) => {
                state.isAuthPending = true;
            })
            .addCase(fetchPathUserData.rejected, (state, action) => {
                state.isAuthPending = false;
                console.log('PATСH user rejected ' + action.payload)
            })
            .addCase(fetchLogOut.fulfilled, (state, action) => {
                console.log('loginOut OK' + action.payload)
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
            .addCase(fetchLogOut.rejected, (state, action) => {
                console.log('loginOut attempt rejected ' + action.payload)
                state.isAuthPending = false;
            })

    }
});

export default userSlice.reducer;