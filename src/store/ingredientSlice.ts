import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseUrl} from "../utils/constants";
import {checkResponse} from "../utils/api";
import {TIngredient} from "../types/types";

export const fetchIngredient = createAsyncThunk(
    'ingredient/fetchIngredient',
    async function (id: string, {rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/ingredients`);
            const actualData = await checkResponse(response) as {data: TIngredient[]}
            const ingredient = actualData.data.find((item) => {
                return item._id === id;
            })
            return ingredient;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

interface IInitialState {
    isOpened: boolean,
    isFailed: boolean,
    isLoading: boolean,
    data: TIngredient
}

const initialState: IInitialState = {
    isOpened: false,
    isFailed: false,
    isLoading: true,
    data: {} as TIngredient
}

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState: initialState,
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
                state.data = action.payload as TIngredient
            })
            .addCase(fetchIngredient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchIngredient.rejected, (state, action) => {
                state.isLoading = false;
                state.isFailed = true;
                state.data = {} as TIngredient;
            })
    }
})

export const {setIngredientModalOpened, setIngredientModalClosed} = ingredientSlice.actions;
export default ingredientSlice.reducer;