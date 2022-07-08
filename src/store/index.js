import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice'
import ingredientReducer from './ingredientSlice';
import burgerConstructorReducer from './burgerConstructorSlice'

export default configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        ingredient: ingredientReducer,
        burgerConstructor: burgerConstructorReducer
    }
});
