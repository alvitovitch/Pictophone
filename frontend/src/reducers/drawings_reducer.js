import {
    RECEIVE_ALL_DRAWINGS,
    RECEIVE_DRAWING
} from '../actions/drawings_actions'

const DrawingsReducer = (state ={}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch(action.type) {
        case RECEIVE_ALL_DRAWINGS:
            action.drawings.data.forEach(drawing => (
                nextState[drawing._id] = drawing
            ))
            return nextState;
        case RECEIVE_DRAWING:
            nextState[action.drawing.data._id] = action.drawing.data
            return nextState;
        default:
            return state
    }
}

export default DrawingsReducer;