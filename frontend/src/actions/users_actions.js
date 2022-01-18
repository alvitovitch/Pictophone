import * as UsersApiUtils from '../util/users_api_utils';

export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS'

const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS,
    users
})

export const requestAllUsers = () => dispatch => {
    UsersApiUtils.fetchAllUsers()
        .then(users => dispatch(receiveAllUsers(users)))
}