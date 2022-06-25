import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {constructorReducer} from "./burgerConstructor";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
})