import {baseUrl} from "../../utils/constants";
import {checkResponse} from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR'

export function getIngredients() {
    return async (dispatch) => {
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
                        type: GET_INGREDIENTS_ERROR
                    });
                }
            }).catch(err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
            console.log(err);
            dispatch({
                type: GET_INGREDIENTS_ERROR
            })
        });
    };
}
