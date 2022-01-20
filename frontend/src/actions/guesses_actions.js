import * as GuessesApiUtils from "../util/guesses_api_utils"

export const RECEIVE_ALL_GUESSES = 'RECEIVE_ALL_GUESSES'
export const RECEIVE_GUESS = 'RECEIVE_GUESS'

const receiveAllGuesses = guesses => {
    return {
        type: RECEIVE_ALL_GUESSES,
        guesses
    }
}

const receiveGuess = guess => {
    return {
        type: RECEIVE_GUESS,
        guess
    }
}

export const requestAllguesses = () => dispatch =>{
    return GuessesApiUtils.fetchAllGuesses()
        .then(guesses => dispatch(receiveAllGuesses(guesses)))
        .catch(err => console.log(err))
}

export const requestGuess = guessObj => dispatch => {
    return GuessesApiUtils.fetchGuess(guessObj)
        .then(guess => dispatch(receiveGuess(guess)))
        .catch(err => console.log(err))
}