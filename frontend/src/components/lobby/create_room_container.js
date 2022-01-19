import { connect } from "react-redux"
import { closeModal } from "../../actions/modal_actions"
import { clearErrors, createRoom } from "../../actions/rooms_actions"
import RoomForm from "./room_form"

const mSTP = state => ({
    room: {
        name: '',
        size: 0,
        host_id: state.session.user.id
    },
    errors: state.errors.rooms 
})

const mDTP = dispatch => ({
    formAction: (room) => dispatch(createRoom(room)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mSTP,mDTP)(RoomForm)