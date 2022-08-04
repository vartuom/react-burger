import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from "../utils/constants";

export const fetchIngredient = createAsyncThunk(
    'ingredient/fetchIngredient',
    async function (id, {rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/ingredients`);
            if (!response.ok) {
                throw new Error('Ошибка при получении данных с сервера!')
            }
            const actualData = await response.json();
            const ingredient = actualData.data.find((item) => {
                return item._id === id;
            })
            return ingredient;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState: {
        isFailed: false,
        isLoading: true,
        data: {}
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isFailed = false;
                state.data = action.payload
            })
            .addCase(fetchIngredient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchIngredient.rejected, (state, action) => {
                state.isLoading = false;
                state.isFailed = true;
                state.data = {};
            })
    }
})

export default ingredientSlice.reducer;