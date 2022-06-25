import {ADD_INGREDIENT} from "../actions/burgerConstructor";

const initialState = {
    buns: {},
    mains: []
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    buns: action.payload
                }
            }
            return {
                ...state,
                mains: [...state.mains, action.payload]
            }
        }
        default: {
            return state
        }
    }
}