
import { connect } from 'react-redux';
import LoginForm from './login_form';
import { clearErrors, login, signup } from '../../actions/session_actions';


const mSTP = state => ({
    errors: state.errors.session,
});

const mDTP = dispatch => ({
    login: formUser => dispatch(login(formUser)),
    clearErrors: () => dispatch(clearErrors()),
    signup: user => dispatch(signup(user))
});

export default connect(mSTP, mDTP)(LoginForm);