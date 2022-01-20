
import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { clearErrors, signup } from '../../actions/session_actions';


const mSTP = state => ({
    errors: state.errors.session,
});

const mDTP = dispatch => ({
    signup: formUser => dispatch(signup(formUser)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mSTP, mDTP)(SignupForm);