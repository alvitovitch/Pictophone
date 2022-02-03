import { connect } from 'react-redux';
import Room from './room';
import { randomPrompts } from '../../reducers/selectors';
import { requestAllUsers } from '../../actions/users_actions';
import { requestRoom, updateRoom } from '../../actions/rooms_actions'
import { requestAllPrompts } from '../../actions/prompts_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { createGame, requestGame } from '../../actions/games_actions';
import { receiveDemo } from '../../actions/demo_actions';


const mSTP = (state, ownProps) => {
    return{
        currentUser: state.session.user,
        roomId: ownProps.match.params.roomId,
        room: state.entities.rooms[ownProps.match.params.roomId],
        modal: state.ui.modal,
        users: state.entities.users,
        prompts: state.entities.prompts
    }
    
}

const mDTP = dispatch => {
    return{
        requestRoom: roomId => dispatch(requestRoom(roomId)),
        updateRoom: roomId => dispatch(updateRoom(roomId)),
        openModal: modal => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal()),
        requestAllUsers: () => dispatch(requestAllUsers()),
        requestAllPrompts: () => dispatch(requestAllPrompts()),
        createGame: (game) => dispatch(createGame(game)),
        requestGame: roomId => dispatch(requestGame(roomId)),
        receiveDemo: demo => dispatch(receiveDemo(demo)),
    }
}


export default connect(mSTP, mDTP)(Room)