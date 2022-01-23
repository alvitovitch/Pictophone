import {
    RECEIVE_ALL_GUESSES,
    RECEIVE_GUESS
} from '../actions/guesses_actions'

const GuessesReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_GUESSES:
            action.guesses.data.forEach(guess => nextState[guess._id] = guess);
            return nextState;
        case RECEIVE_GUESS:
            nextState[action.guess.data._id] = action.guess.data
            return nextState;
        default:
            return state;
    }
}

export default GuessesReducer;