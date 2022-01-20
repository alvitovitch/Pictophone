import { 
    CLEAR_ERRORS,
    RECEIVE_ROOM_ERRORS,
    ROOM_FULL_ERROR
} from '../actions/rooms_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const RoomsErrorsReducer = (state = [], action) => {
    switch(action.type){
        case RECEIVE_ROOM_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
            return [];
        case CLEAR_ERRORS:
            return [];
        case ROOM_FULL_ERROR:
            return { full: {msg: "Room is full", id: action.roomId}}
        default:
            return state
    }
}

export default RoomsErrorsReducer