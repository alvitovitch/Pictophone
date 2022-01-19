import { connect } from 'react-redux';
import Room from './room';
import { randomPrompts } from '../../reducers/selectors';

import { requestRoom, updateRoom } from '../../actions/rooms_actions'

const mSTP = (state, ownProps) => {
    debugger
    return{
        currentUser: state.session.user,
        roomId: ownProps.match.params.roomId,
        room: requestRoom(ownProps.match.params.roomId),
    }
    
}

const mDTP = dispatch => {
    return{
        requestRoom: roomId => dispatch(requestRoom(roomId)),
        updateRoom: roomId => dispatch(updateRoom(roomId)),
        // update board
    }
}


export default connect(mSTP, mDTP)(Room)