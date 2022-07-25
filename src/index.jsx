import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import {Provider} from "react-redux";
import store from "./store";

//const enhancer = composeEnhancers(applyMiddleware(thunk));
//const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
        <Provider store={store}>
            <App/>
        </Provider>
);