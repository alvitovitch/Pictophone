import { 
    RECEIVE_ALL_USERS,
    REMOVE_USER
} from '../actions/users_actions'

const UsersReducer = (state={}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch( action.type ) {
        case RECEIVE_ALL_USERS:
            action.users.data.forEach(user => nextState[user._id] = user)
            return nextState;
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        default:
            return state;
    }
}

export default UsersReducer;