import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import ingredientReducer from './ingredientSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import orderReducer from './orderSlice';
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import thunk from "redux-thunk";
import {wsActions} from "./feedSlice";
import {socketMiddleware} from "../services/webSocket/socketMiddleware";

export default configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        ingredient: ingredientReducer,
        burgerConstructor: burgerConstructorReducer,
        order: orderReducer,
        user: userReducer,
        feed: feedReducer
    },
    middleware: [
        thunk,
        socketMiddleware(wsActions)
    ]
});
