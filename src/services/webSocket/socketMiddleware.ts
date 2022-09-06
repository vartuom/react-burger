import {IwsActions} from "../../store/feedSlice";
import {MiddlewareAPI, AnyAction} from '@reduxjs/toolkit'

export const socketMiddleware = (wsActions: IwsActions) => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;
        let url = '';

        return (next: (arg: AnyAction) => void ) => (action: AnyAction) => {
            const {dispatch} = store;
            const {type} = action;
            if (type === wsActions.wsConnectionInit.type) {
                url = action.payload;
                socket = new WebSocket(url);
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsActions.wsConnectionOK());
                };
                socket.onerror = event => {
                    dispatch(wsActions.wsConnectionError('connection error'))
                };
                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    dispatch(wsActions.wsOnMessage(parsedData));
                };
                socket.onclose = event => {
                    if (event.code !== 1000) {
                        dispatch(wsActions.wsConnectionError(event.code.toString()));
                    }
                };

                if (type === wsActions.wsConnectionClose.type) {
                    socket.close(1000);
                }
            };
            next(action);
        };
    };
};