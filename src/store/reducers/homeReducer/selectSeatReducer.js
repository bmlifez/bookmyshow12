import {FETCH_POST,SELECT_SEAT} from '../../actions/homeAction/types';

const initialState = { 
    selectedSeat:{}
}

export default function(state = initialState , action){
    switch(action.type){
        case SELECT_SEAT:
            return {
                ...state,
                selectedSeat: action.payload
            }
        default:
            return state;
    }
}