import {FETCH_POST,SELECT_SEAT} from '../../actions/homeAction/types';

const initialState = { 
    selectedSeat:[]
}

const postReducer=(state=initialState,action)=>{
    switch(action.type){
        case SELECT_SEAT:
            let addSeat = state.selectedSeat;
            addSeat.push(action.payload);
            return {
                ...state,
                selectedSeat: addSeat
            }
        default:
            return state;
    }
}

export default postReducer;