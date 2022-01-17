import { connect } from "react-redux"
import LobbyIndex from "./lobby_index"

const mSTP = state => ({
    // rooms: Object.values(state.entities.rooms),
    // users: Object.values(state.entities.users)
})

const mDTP = dispatch => ({
    // requestRooms: () => dispatch(requestRooms()),
    // createRoom: (room) => dispatch(createRoom(room)),
    // updateRoom: (room) => dispatch(updateRoom(room)),
    // deleteRoom: (roomId) => dispatch(deleteRoom(roomId))
})

export default connect(mSTP,mDTP)(LobbyIndex)