import {
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL
} from "../actions/ingredient";

const initialState = {
    isOpened: false,
    data: {}
}

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_INGREDIENT_MODAL: {
            return {
                ...state,
                isOpened: true,
                data: action.payload
            }
        }
        case CLOSE_INGREDIENT_MODAL: {
            return {
                ...state,
                isOpened: false
            }
        }
        default: {
            return state
        }
    }
}