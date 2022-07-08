import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from "./services/reducers";
import {Provider} from "react-redux";
import store from "./store";



//const enhancer = composeEnhancers(applyMiddleware(thunk));
//const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);