import {createSlice} from "@reduxjs/toolkit";

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        ingredientsRequest: true,
        ingredientsFailed: false,
        data: []
    },
    reducers: {

    }
})