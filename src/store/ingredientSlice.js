import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from "../utils/constants";
import {checkResponse} from "../utils/api";

export const fetchIngredient = createAsyncThunk(
    'ingredient/fetchIngredient',
    async function (id, {rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/ingredients`);
            const actualData = await checkResponse(response)
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
        isOpened: false,
        isFailed: false,
        isLoading: true,
        data: {}
    },
    reducers: {
        setIngredientModalOpened(state) {
            state.isOpened = true;
        },
        setIngredientModalClosed(state) {
            state.isOpened = false;
        }
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

export const {setIngredientModalOpened, setIngredientModalClosed} = ingredientSlice.actions;
export default ingredientSlice.reducer;