import { connect } from 'react-redux';
import NavBar from './navbar';
import { logout } from '../../actions/session_actions';
import { withRouter } from "react-router-dom";
import { updateRoom } from '../../actions/rooms_actions';

const mSTP = state => {
    return{
        loggedIn: state.session.isAuthenticated,
        currentUser: state.session.user
    }
}

const mDTP = dispatch => {
    return{
        logout: () => dispatch(logout()),
        updateRoom: (roomObj) => dispatch(updateRoom(roomObj))
    }
}


export default withRouter(connect(mSTP, mDTP)(NavBar))