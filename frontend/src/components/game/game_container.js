import { connect } from 'react-redux';
import { randomPrompts } from '../../reducers/selectors';

import { fetchRoom } from '../../actions/rooms_actions';
import Game from './game'
import { closeModal } from '../../actions/modal_actions';


const mSTP = (state, ownProps) => {
    return {
    }
}

// selector is random prompts. func that takes in state.entities.prompts.values
// return array that samples those values for each player depending on the room size
// while array is less than room size continue to sample 


const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    }
}


export default connect(mSTP, mDTP)(Game)