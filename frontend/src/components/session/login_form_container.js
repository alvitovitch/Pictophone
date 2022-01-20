
import { connect } from 'react-redux';
import LoginForm from './login_form';
import { clearErrors, login } from '../../actions/session_actions';


const mSTP = state => ({
    errors: state.errors.session,
});

const mDTP = dispatch => ({
    login: formUser => dispatch(login(formUser)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mSTP, mDTP)(LoginForm);