import axios from 'axios';

export const fetchAllRooms = () => {
    return axios.get("/api/rooms")
}

export const fetchRoom = (roomId) => {
    return axios.get(`/api/rooms/${roomId}`)
}

export const updateRoom = (room) => {
    return axios.patch(`/api/rooms/${room.id}`, room)
}

export const deleteRoom = (roomId) => {
    return axios.delete(roomId)
}