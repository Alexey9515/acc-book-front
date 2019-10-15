import * as types from './action-types';
import * as service from '../service';
import axios from "axios/index";

function responseError(err, dispatch, default_error_type) {
    const respErr = err.response.data;
    if (respErr !== undefined && respErr.error) {
        dispatch({
            type: default_error_type,
            payload: respErr.error
        });
    } else if (!err.response.data) {
        dispatch({
            type: default_error_type,
            payload: err.message
        });
    } else {
        dispatch({
            type: types.ERROR_NOTIFICATION,
            payload: 'Ошибка сервера'
        });
    }
}

export const loadUsers = () => (dispatch) => {
    service.getUsers().then((data) => {
        dispatch({
            type: types.LOAD_USERS,
            payload: data
        })
    });
};

export const updateUser = (user) => (dispatch) => {
    dispatch({
        type: types.LOAD_USERS,
        payload: undefined
    });
    return service.updateUser(user);
};

export const deleteAll = () => (dispatch) => {
    dispatch({
        type: types.LOAD_USERS,
        payload: undefined
    });
    return service.deleteAll();
};

export const addUser = (request) => (dispatch) => {
    dispatch({
        type: types.LOAD_USERS,
        payload: undefined
    });
    return service.addUser(request);
};


export const resetNotification = () => (dispatch) => {
    dispatch({
        type: types.ERROR_NOTIFICATION_RESET,
        payload: null
    });
};

export const login = (user) => (dispatch) => {
    dispatch({
        type: types.ERROR_NOTIFICATION_RESET,
        payload: null
    });
    const auth = btoa(`${user.login}:${user.password}`);
    axios.defaults.headers.common['Authorization'] = `Basic ${auth}`;
    dispatch({
        type: types.LOGIN,
        payload: user.login
    })
};