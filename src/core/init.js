import axios from 'axios';
import * as constants from '../constants';

export const initApp = function () {
    axios.defaults.baseURL = constants.BASE_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
};