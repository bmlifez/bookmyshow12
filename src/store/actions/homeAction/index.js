import {SELECT_SEAT} from './types';

export function selectSeat(payload){
    return {
        type:SELECT_SEAT,
        payload
    }
}

export default selectSeat;