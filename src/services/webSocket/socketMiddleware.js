export const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;
        let url = '';

        return next => action => {
            const {dispatch, getState} = store;
            const {type, payload} = action;
            //const { wsConnect, wsDisconnect, wsSendMessage, onConnect, onOpen, onClose, onError, onMessage, wsConnecting } = wsActions;

            //type - сгенерированая строка action creator'а
            if (type === wsActions.wsConnectionInit.type) {
                url = action.payload;
                socket = new WebSocket(url);
                //dispatch(wsActions.wsConnectionInit());
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(wsActions.wsConnectionOK());
                    //dispatch(onOpen());
                };
                socket.onerror = event => {
                    console.log(event)
                    //dispatch(onError(event.code.toString()));
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