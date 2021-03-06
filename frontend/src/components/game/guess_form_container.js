import { connect } from 'react-redux'
import GuessForm from './guess_form'
import { requestDrawing } from '../../actions/drawings_actions'
import { createGuess } from '../../actions/guesses_actions'
import { updateGame } from '../../actions/games_actions'

const mSTP = state => {
    return {

    }
}

const mDTP = dispatch => {
    return {
        requestDrawing: drawObj => dispatch(requestDrawing(drawObj)),
        createGuess: guessObj => dispatch(createGuess(guessObj)),
        updateGame: (gameObj) => dispatch(updateGame(gameObj))
    }
}

export default connect(mSTP, mDTP)(GuessForm)