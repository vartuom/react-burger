import {ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT} from "../actions/burgerConstructor";

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
        case MOVE_INGREDIENT: {
            //копируем стейт в рабочий массив
            const updatedList = state.mains;
            //копируем захваченную карточку
            const dragCard = state.mains[action.dragIndex];
            //удаляем карточку из копии стейта
            updatedList.splice(action.dragIndex, 1);
            //вставляем карточку на позицию элемента над которым перетаскиваемая карточка
            updatedList.splice(action.hoverIndex, 0, dragCard)
            return {
                ...state,
                mains: updatedList

            }
        }
        default: {
            return state
        }
    }
}