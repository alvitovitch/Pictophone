import { connect } from "react-redux"
import { closeModal, openModal } from "../../actions/modal_actions"
import { createRoom } from "../../actions/rooms_actions"
import RoomForm from "./room_form"

const mSTP = state => ({
    room: {
        name: '',
        size: 0,
        host_id: state.session.user.id
    }
})

const mDTP = dispatch => ({
    formAction: (room) => dispatch(createRoom(room)),
    closeModal: () => dispatch(closeModal)
})

export default connect(mSTP,mDTP)(RoomForm)