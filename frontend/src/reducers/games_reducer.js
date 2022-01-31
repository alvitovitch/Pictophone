import {
    RECEIVE_GAME,
    REMOVE_GAME
} from '../actions/games_actions'

const GameReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)

    switch (action.type) {
        case RECEIVE_GAME:
            nextState[action.game.data._id] = action.game.data;
            return nextState;
        default:
            return state;
    }
}

export default GameReducer;