import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from "../utils/constants";
import {setCookie} from "../utils/storage";

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
            rejectWithValue(error.message)
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
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
                state.isLoggedIn = true;
                state.user.email = action.payload.user.email;
                state.user.name = action.payload.user.name;
                const accessToken = action.payload.accessToken.split('Bearer ')[1];
                setCookie('accessToken', accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(fetchRegUser.rejected, (state) => {
                state.user.email = '';
                state.user.name = '';
            })
    }
});

export default userSlice.reducer;