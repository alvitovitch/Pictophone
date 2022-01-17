
import { connect } from 'react-redux';
import SignupForm from './login_form';
import { signup } from '../../actions/session_actions';


const mSTP = state => ({
    errors: Object.values(state.errors.session),
});

const mDTP = dispatch => ({
    signup: formUser => dispatch(signup(formUser))
});

export default connect(mSTP, mDTP)(SignupForm);