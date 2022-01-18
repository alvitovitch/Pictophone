import * as RoomsApiUtils from '../util/rooms_api_utils'

export const RECEIVE_ALL_ROOMS = "RECEIVE_ALL_ROOMS"
export const RECEIVE_ROOM = "RECEIVE_ROOM"
export const REMOVE_ROOM = "REMOVE_ROOM"

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

export const requestAllRooms = () => dispatch =>{
    RoomsApiUtils.fetchAllRooms()
        .then(rooms => dispatch(receiveAllRooms(rooms)))
}

export const requestRoom = (roomId) => dispatch => {
    RoomsApiUtils.fetchRoom(roomId)
        .then(room => dispatch(receiveRoom(room)))
}

export const createRoom = room => dispatch => {
    RoomsApiUtils.createRoom(room)
        .then(room => dispatch(receiveRoom(room)))
}

export const updateRoom = (roomId, playerId) => dispatch => {
    RoomsApiUtils.updateRoom(roomId, playerId)
        .then(room => dispatch(receiveRoom(room)))
}

export const deleteRoom = (roomId) => dispatch => {
    RoomsApiUtils.deleteRoom(roomId)
        .then(() => dispatch(removeRoom(roomId)))
}