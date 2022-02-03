import { connect } from "react-redux"
import LobbyIndex from "./lobby_index"
import { requestAllRooms, createRoom, deleteRoom, updateRoom, roomFullError } from "../../actions/rooms_actions"
import { requestAllUsers } from "../../actions/users_actions"
import { requestAllDrawings } from "../../actions/drawings_actions";
import { openModal } from "../../actions/modal_actions"

const mSTP = state => ({
    rooms: Object.values(state.entities.rooms),
    users: state.entities.users,
    currentUser: state.session.user,
    errors: state.errors.rooms,
    drawings: Object.values(state.entities.drawings)
})

const mDTP = dispatch => ({
    requestAllUsers: () => dispatch(requestAllUsers()),
    requestAllRooms: () => dispatch(requestAllRooms()),
    requestAllDrawings: () => dispatch(requestAllDrawings()),
    createRoom: (room) => dispatch(createRoom(room)),
    updateRoom: (roomId, playerId) => dispatch(updateRoom(roomId, playerId)),
    deleteRoom: (roomId) => dispatch(deleteRoom(roomId)),
    openModal: (modal) => dispatch(openModal(modal)),
    roomFullError: (roomId) => dispatch(roomFullError(roomId))
})

export default connect(mSTP,mDTP)(LobbyIndex)