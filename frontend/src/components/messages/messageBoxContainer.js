import { connect } from 'react-redux';
import MessageBox from './messageBox';


const mSTP = state => {
    return{
        user: state.session.user
    }
}

const mDTP = dispatch => {
    return {

    }
}


export default connect(mSTP, mDTP)(MessageBox)