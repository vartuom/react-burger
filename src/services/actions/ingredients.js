import {baseUrl} from "../../utils/constants";
import {checkResponse} from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetch(`${baseUrl}/ingredients`)
            .then(checkResponse)
            .then(actualData => {
            if (actualData && actualData.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: actualData.data
                });
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            }
        }).catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        });
    };
}
