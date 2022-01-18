import * as UsersApiUtils from '../util/users_api_utils';

export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS'
export const RECEIVE_USERS_ERRORS = 'RECEIVE_USERS_ERRORS'

const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS,
    users
})

const receiveErrors = errors => ({
    type: RECEIVE_USERS_ERRORS,
    errors
})

export const requestAllUsers = () => dispatch => {
    return UsersApiUtils.fetchAllUsers()
        .then(users => dispatch(receiveAllUsers(users),
            errors => dispatch(receiveErrors(errors.response.data))))
}