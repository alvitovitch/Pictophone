import * as UsersApiUtils from '../util/users_api_utils';

export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS'
export const RECEIVE_USERS_ERRORS = 'RECEIVE_USERS_ERRORS'
export const REMOVE_USER = 'REMOVE_USER'

const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS,
    users
})

const receiveErrors = errors => ({
    type: RECEIVE_USERS_ERRORS,
    errors
})

const removeUser = user => ({
    type: REMOVE_USER,
    user
})

export const requestAllUsers = () => dispatch => {
    return UsersApiUtils.fetchAllUsers()
        .then(users => dispatch(receiveAllUsers(users),
            errors => dispatch(receiveErrors(errors.response.data))))
}

export const deleteUser = user => dispatch => {
    return UsersApiUtils.deleteUser(user)
        .then(() => dispatch(removeUser(user)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
}