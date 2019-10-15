import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./core/reducers";
import {initApp} from './core/init';
import AccBook from './core/page';

initApp();

const middleware = composeWithDevTools(applyMiddleware(thunk));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={createStore(reducers, middleware)}>
            <Route component={AccBook}/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
