import { connect } from 'react-redux';
import Room from './room';

import { updateRoom } from '../../actions/rooms_actions'

const mSTP = (state, ownProps) => {
    return{
        // players: Object.values(state.entities.users)
        roomId: ownProps.match.params.roomId
    }
}

const mDTP = dispatch => {
    return{
        updateRoom: roomId => dispatch(updateRoom(roomId))
        // update board
    }
}


export default connect(mSTP, mDTP)(Room)