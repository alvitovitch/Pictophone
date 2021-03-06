import { connect } from 'react-redux';
import { randomPrompts } from '../../reducers/selectors';
import { withRouter } from 'react-router-dom'
import { createDrawing } from '../../actions/drawings_actions';
import { fetchRoom } from '../../actions/rooms_actions';
import Game from './game'
import { closeModal } from '../../actions/modal_actions';
import { requestGuess } from '../../actions/guesses_actions';
import { createGuess } from '../../actions/guesses_actions'
import { updateGame } from '../../actions/games_actions';


const mSTP = (state, ownProps) => {
    return {
        room: ownProps.room,
        currentUser: state.session.user,
        guesses: state.entities.guesses
    }
}

const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        createDrawing: drawObject => dispatch(createDrawing(drawObject)),
        requestGuess: (guessObj) => dispatch(requestGuess(guessObj)),
        createGuess: guessObj => dispatch(createGuess(guessObj)),
        updateGame: (gameObj) => dispatch(updateGame(gameObj))
    }
}


export default withRouter(connect(mSTP, mDTP)(Game))