import { connect } from 'react-redux';
import Room from './room';
import { randomPrompts } from '../../reducers/selectors';
import { requestAllUsers } from '../../actions/users_actions';
import { requestRoom, updateRoom } from '../../actions/rooms_actions'
import { openModal } from '../../actions/modal_actions';

const mSTP = (state, ownProps) => {
    return{
        currentUser: state.session.user,
        roomId: ownProps.match.params.roomId,
        room: state.entities.rooms[ownProps.match.params.roomId],
        modal: state.ui.modal,
        users: state.entities.users
    }
    
}

const mDTP = dispatch => {
    return{
        requestRoom: roomId => dispatch(requestRoom(roomId)),
        updateRoom: roomId => dispatch(updateRoom(roomId)),
        openModal: modal => dispatch(openModal(modal)),
        requestAllUsers: () => dispatch(requestAllUsers())
        // randomPrompts: (roomSize, state)

        // update board
    }
}


export default connect(mSTP, mDTP)(Room)