import * as types from '../../../core/actions/action-types.js';

const initialState = {};

const notification = function (state = initialState, action) {
    if (action.type === types.ERROR_NOTIFICATION) {
        return {...state, error: action.payload};
    }else if (action.type === types.ERROR_NOTIFICATION_RESET) {
        return {...initialState};
    }
    return state;
};

export default notification;