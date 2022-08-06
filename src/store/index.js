import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import ingredientReducer from './ingredientSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import orderReducer from './orderSlice';
import userReducer from './userSlice'

export default configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        ingredient: ingredientReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        user: userReducer
    }
});
