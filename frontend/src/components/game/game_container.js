import { connect } from 'react-redux';
import { randomPrompts } from '../../reducers/selectors';
import { withRouter } from 'react-router-dom'
import { createDrawing } from '../../actions/drawings_actions';
import { fetchRoom } from '../../actions/rooms_actions';
import Game from './game'
import { closeModal } from '../../actions/modal_actions';
import { requestGuess } from '../../actions/guesses_actions';


const mSTP = (state, ownProps) => {
    return {
        room: ownProps.room,
        currentUser: state.session.user,
        guesses: state.entities.guesses
    }
}

// selector is random prompts. func that takes in state.entities.prompts.values
// return array that samples those values for each player depending on the room size
// while array is less than room size continue to sample 


const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        createDrawing: drawObject => dispatch(createDrawing(drawObject)),
        requestGuess: (guessObj) => dispatch(requestGuess(guessObj)),
    }
}


export default withRouter(connect(mSTP, mDTP)(Game))