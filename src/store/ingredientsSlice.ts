import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {baseUrl} from "../utils/constants";
import {checkResponse} from "../utils/api";
import {TIngredient} from "../types/types";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async function(_,{rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/ingredients`);
            const actualData = await checkResponse(response);
            return actualData;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

interface IInitialState {
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    data: Array<TIngredient>
}

const initialState:IInitialState = {
    //не даем начать прорисовку компонентов пока не пришли данные с сервера
    ingredientsRequest: true,
    /*Сбрасываем статус наличия ошибок от предыдущего запроса
    на случай, если он был и завершился с ошибкой*/
    ingredientsFailed: false,
    data: []
}

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.ingredientsRequest = true;
                state.ingredientsFailed = false;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredientsRequest = false;
                state.ingredientsFailed = false;
                state.data = action.payload.data;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.ingredientsRequest = false;
                state.ingredientsFailed = true;
                state.data = [];
            })
    }
})

export default ingredientsSlice.reducer;
