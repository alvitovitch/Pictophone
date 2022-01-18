import { connect } from "react-redux"
import LobbyIndex from "./lobby_index"
import { requestAllRooms, createRoom, deleteRoom, updateRoom } from "../../actions/rooms_actions"
import { requestAllUsers } from "../../actions/users_actions"
import { openModal } from "../../actions/modal_actions"

const mSTP = state => ({
    rooms: Object.values(state.entities.rooms),
    users: state.entities.users,
    currentUser: state.session.user
})

const mDTP = dispatch => ({
    requestAllUsers: () => dispatch(requestAllUsers()),
    requestAllRooms: () => dispatch(requestAllRooms()),
    createRoom: (room) => dispatch(createRoom(room)),
    updateRoom: (roomId, playerId) => dispatch(updateRoom(roomId, playerId)),
    deleteRoom: (roomId) => dispatch(deleteRoom(roomId)),
    openModal: (modal) => dispatch(openModal(modal))
})

export default connect(mSTP,mDTP)(LobbyIndex)