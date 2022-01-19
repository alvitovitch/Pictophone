import * as RoomsApiUtils from '../util/rooms_api_utils'

export const RECEIVE_ALL_ROOMS = "RECEIVE_ALL_ROOMS"
export const RECEIVE_ROOM = "RECEIVE_ROOM"
export const REMOVE_ROOM = "REMOVE_ROOM"
export const RECEIVE_ROOM_ERRORS = "RECEIVE_ROOM_ERRORS"
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

const receiveAllRooms = rooms => {
    return {
        type: RECEIVE_ALL_ROOMS,
        rooms
    }
}

const receiveRoom = room => {
    return {
        type: RECEIVE_ROOM,
        room
    }
}

const removeRoom = roomId => {
    return {
        type: REMOVE_ROOM,
        roomId
    }
}

const receiveErrors = errors => {
    return {
        type: RECEIVE_ROOM_ERRORS,
        errors
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}

export const requestAllRooms = () => dispatch =>{
    return RoomsApiUtils.fetchAllRooms()
        .then(rooms => dispatch(receiveAllRooms(rooms)))
        .catch(errors => dispatch(receiveErrors(errors.response.data)))
}

export const requestRoom = (roomId) => dispatch => {
    return RoomsApiUtils.fetchRoom(roomId)
        .then(room => dispatch(receiveRoom(room)))
        .catch(errors => dispatch(receiveErrors(errors.response.data)))
}

export const createRoom = room => dispatch => {
    return RoomsApiUtils.createRoom(room)
        .then(room => dispatch(receiveRoom(room)))
        .catch(errors => dispatch(receiveErrors(errors.response.data)))
}

export const updateRoom = (object) => dispatch => {
    return RoomsApiUtils.updateRoom(object['roomId'], object['playerId'])
        .then(room => dispatch(receiveRoom(room)))
        .catch(errors => dispatch(receiveErrors(errors.response.data)))
}

export const deleteRoom = (roomId) => dispatch => {
    return RoomsApiUtils.deleteRoom(roomId)
        .then(() => dispatch(removeRoom(roomId)))
        .catch(errors => dispatch(receiveErrors(errors.response.data)))
}