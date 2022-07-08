import {createSlice} from "@reduxjs/toolkit";

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState: {
        isOpened: false,
        data: {}
    },
    reducers: {
        openModal(state, action) {
            state.isOpened = true;
            state.data = action.payload.ingredient
        },
        closeModal(state) {
            state.isOpened = false
        }
    }
})

export const {openModal, closeModal} = ingredientSlice.actions;
export default ingredientSlice.reducer;