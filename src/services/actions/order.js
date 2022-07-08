import {baseUrl} from "../../utils/constants";
import {checkResponse} from "../../utils/api";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const POST_ORDER_ERROR = 'POST_ORDER_ERROR'
export const CLOSE_DETAILS_MODAL = 'CLOSE_DETAILS_MODAL'

export function post(data) {
    return async (dispatch) => {
        dispatch({
            type: POST_ORDER_REQUEST
        });
        fetch(`${baseUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                //раскладываем бургер на компоненты и выбираем id компонентов
                ingredients: data.map((component) => component._id)
            })
        })
            .then(checkResponse)
            .then(actualData => {
                if (actualData && actualData.success) {
                    dispatch({
                        type: POST_ORDER_SUCCESS,
                        payload: actualData
                    });
                } else {
                    dispatch({
                        type: POST_ORDER_ERROR
                    });
                }
            }).catch(err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
            console.log(err);
            dispatch({
                type: POST_ORDER_ERROR
            })
        });
    };
}