import { connect } from 'react-redux';

import { fetchRoom } from '../../actions/rooms_actions';
import Game from './game'


const mSTP = state => {
    return {

    }
}


const mDTP = dispatch => {
    return {
    }
}


export default connect(mSTP, mDTP)(Game)