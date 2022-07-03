import {
    POST_ORDER_ERROR,
    POST_ORDER_SUCCESS,
    POST_ORDER_REQUEST, CLOSE_DETAILS_MODAL
} from "../actions/order";

const initialState = {
    isOpened: false,
    name: '',
    orderNumber: 0,
    data: []
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.payload.order.number,
                name: action.payload.name,
                isOpened: true
            };
        }
        case POST_ORDER_ERROR: {
            return {
                ...state
            };
        }
        case CLOSE_DETAILS_MODAL: {
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