import { connect } from "react-redux"
import LobbyIndex from "./lobby_index"
import { requestAllRooms, createRoom, deleteRoom, updateRoom } from "../../actions/rooms_actions"
import { requestAllUsers } from "../../actions/users_actions"

const mSTP = state => ({
    rooms: Object.values(state.entities.rooms),
    currentUsers: state.session.user
})

const mDTP = dispatch => ({
    requestAllUsers: () => dispatch(requestAllUsers()),
    requestAllRooms: () => dispatch(requestAllRooms()),
    createRoom: (room) => dispatch(createRoom(room)),
    updateRoom: (roomId, playerId) => dispatch(updateRoom(roomId, playerId)),
    deleteRoom: (roomId) => dispatch(deleteRoom(roomId))
})

export default connect(mSTP,mDTP)(LobbyIndex)