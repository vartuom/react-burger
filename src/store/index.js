import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import {applyMiddleware, compose} from "redux";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;


const enhancer = composeEnhancers(applyMiddleware());
export default configureStore({
    reducer: {
        todos: todoReducer,
    },
    enhancer
});
