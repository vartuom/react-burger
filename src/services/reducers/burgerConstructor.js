import {ADD_INGREDIENT, REMOVE_INGREDIENT} from "../actions/burgerConstructor";

const initialState = {
    bun: {},
    mains: []
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload
                }
            }
            return {
                ...state,
                mains: [...state.mains, action.payload]
            }
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                //комбинируем слайсы до и после индекса элемента, который нужно удалить
                mains: [...state.mains.slice(0, action.index), ...state.mains.slice(action.index + 1)]

            }
        }
        default: {
            return state
        }
    }
}