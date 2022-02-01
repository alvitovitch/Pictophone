import { connect } from 'react-redux';
import NavBar from './navbar';
import { logout } from '../../actions/session_actions';
import { withRouter } from "react-router-dom";
import { updateRoom } from '../../actions/rooms_actions';
import { deleteUser } from '../../actions/users_actions';

const mSTP = state => {
    return{
        loggedIn: state.session.isAuthenticated,
        currentUser: state.session.user
    }
}

const mDTP = dispatch => {
    return{
        logout: () => dispatch(logout()),
        updateRoom: (roomObj) => dispatch(updateRoom(roomObj)),
        deleteUser: user => dispatch(deleteUser(user))
    }
}


export default withRouter(connect(mSTP, mDTP)(NavBar))