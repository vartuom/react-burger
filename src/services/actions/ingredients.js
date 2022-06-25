import {baseUrl} from "../../utils/constants";
import {checkResponse} from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

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
                        type: GET_INGREDIENTS_FAILED
                    });
                }
            }).catch(err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
            console.log(err);
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        });
    };
}

/*try {
           dispatch({
               type: GET_INGREDIENTS_REQUEST
           });
           const response = await fetch(`${baseUrl}/ingrediens`);
           if (!response.ok) {
               throw new Error('response')
           }
           const actualData = await response.json();
           dispatch({
               type: GET_INGREDIENTS_SUCCESS,
               ingredients: actualData.data
           })
       } catch (err) {
           console.log('error: ', err)
           dispatch({
               type: GET_INGREDIENTS_FAILED
           })
       }*/
