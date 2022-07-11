import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice'
import ingredientReducer from './ingredientSlice';
import burgerConstructorReducer from './burgerConstructorSlice'
import orderReducer from './orderSlice'

export default configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        ingredient: ingredientReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer
    }
});
