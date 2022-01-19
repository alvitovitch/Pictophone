import { connect } from 'react-redux';
import Room from './room';

import { updateRoom } from '../../actions/rooms_actions'
import { fetchRoom } from '../../util/rooms_api_utils';

const mSTP = (state, ownProps) => {
    return{
        currentUser: state.session.user,
        roomId: ownProps.match.params.roomId
    }
}

const mDTP = dispatch => {
    return{
        updateRoom: roomId => dispatch(updateRoom(roomId)),
        fetchRoom: roomId => dispatch(fetchRoom(roomId))
        // update board
    }
}


export default connect(mSTP, mDTP)(Room)