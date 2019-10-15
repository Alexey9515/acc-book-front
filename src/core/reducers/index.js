import {combineReducers} from 'redux';
import notification from '../../containers/notification/reducers/notification-reducer';
import data from "./data-reducer";

var reducers = combineReducers({
    data,
    notification
});

export default reducers;