import { connect } from 'react-redux'
import GuessForm from './guess_form'
import { requestDrawing } from '../../actions/drawings_actions'

const mSTP = state => {
    return {

    }
}

const mDTP = dispatch => {
    return {
        requestDrawing: drawObj => dispatch(requestDrawing(drawObj)),
        // submitGuess: guessObj => dispatch(submitGuess(guessObj))
    }
}

export default connect(mSTP, mDTP)(GuessForm)