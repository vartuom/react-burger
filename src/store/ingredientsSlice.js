import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {baseUrl} from "../utils/constants";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async function(_,{rejectWithValue}) {
        try {
            const response = await fetch(`${baseUrl}/ingredients`);
            if (!response.ok) {
                throw new Error('Ошибка при получении данных с сервера!')
            }
            const actualData = await response.json();
            return actualData;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        //не даем начать прорисовку компонентов пока не пришли данные с сервера
        ingredientsRequest: true,
        /*Сбрасываем статус наличия ошибок от предыдущего запроса
        на случай, если он был и завершился с ошибкой*/
        ingredientsFailed: false,
        data: []
    },
    reducers: {
    },
    extraReducers: {
        [fetchIngredients.pending]: (state) => {
            state.ingredientsRequest = true;
            state.ingredientsFailed = false;
        },
        [fetchIngredients.fulfilled]: (state, action) => {
            state.ingredientsRequest = false;
            state.ingredientsFailed = false;
            state.data = action.payload.data;
        },
        [fetchIngredients.rejected]: (state, action) => {
            state.ingredientsRequest = false;
            state.ingredientsFailed = true;
            state.data = [];
            console.log(action.payload);
        }
    }

})

export default ingredientsSlice.reducer;
