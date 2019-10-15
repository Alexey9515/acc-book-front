import * as types from "../actions/action-types";


const data = function (state = {}, action) {
    if (action.type === types.LOAD_USERS) {
        return {...state, users: action.payload}
    } else if (action.type === types.LOGIN) {
        return {...state, currentUser: action.payload};
    }
    return state;
};

export default data;