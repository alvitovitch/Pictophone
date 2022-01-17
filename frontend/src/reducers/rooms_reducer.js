import { 
    RECEIVE_ALL_ROOMS,
    RECEIVE_ROOM,
    REMOVE_ROOM
} from "../actions/rooms_actions"; 

const RoomsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state)

    switch(action.type){
        case RECEIVE_ALL_ROOMS:
            return action.rooms;
        case RECEIVE_ROOM:
            nextState[action.room.id] = action.room;
            return nextState;
        case REMOVE_ROOM:
            delete nextState[action.roomId];
            return nextState;
        default:
            return state;
    }
}

export default RoomsReducer