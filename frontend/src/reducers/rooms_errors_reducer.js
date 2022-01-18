import { 
    RECEIVE_ROOM_ERRORS
} from '../actions/rooms_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const RoomsErrorsReducer = (state = [], action) => {
    switch(action.type){
        case RECEIVE_ROOM_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
            return [];
        default:
            return state
    }
}

export default RoomsErrorsReducer