import { connect } from 'react-redux';
import Room from './room';
import { requestAllPrompts } from '../../actions/prompts_actions';
import { requestRoom, updateRoom } from '../../actions/rooms_actions';
import { openModal } from '../../actions/modal_actions';

const mSTP = (state, ownProps) => {
    return{
        currentUser: state.session.user,
        roomId: ownProps.match.params.roomId,
        room: state.entities.rooms[ownProps.match.params.roomId],
        modal: state.ui.modal,
        prompts: state.entities.prompts,
    }
    
}

const mDTP = dispatch => {
    return{
        requestRoom: roomId => dispatch(requestRoom(roomId)),
        updateRoom: roomId => dispatch(updateRoom(roomId)),
        openModal: modal => dispatch(openModal(modal)),
        requestAllPrompts: () => dispatch(requestAllPrompts()),

        // update board
    }
}


export default connect(mSTP, mDTP)(Room)