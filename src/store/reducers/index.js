import {combineReducers} from 'redux';
import postReducer from './homeReducer/selectSeatReducer';

export default combineReducers({
    post: postReducer
});