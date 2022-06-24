import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from "../actions/ingredients";

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    isLoaded: false,
    data: []
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                // Запрос начал выполняться
                ingredientsRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса
                // на случай, если он был и завершился с ошибкой
                ingredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                // Запрос выполнился успешно, помещаем полученные данные в хранилище
                data: action.ingredients,
                // Запрос закончил своё выполнение
                ingredientsRequest: false,
                isLoaded: true
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                // Запрос выполнился с ошибкой,
                // выставляем соответствующие значения в хранилище
                ingredientsFailed: true,
                // Запрос закончил своё выполнение
                ingredientsRequest: false
            };
        }
        default: {
            return state
        }
    }
}