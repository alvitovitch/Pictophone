import axios from 'axios';

export const fetchGame = (roomId) => {
    return axios.get(`/api/games/${roomId}`)
}

export const createGame = game => {
    return axios.post('/api/games/', game)
}

export const updateGame = (roomId, chainObj) => {
    return axios.patch(`/api/games/${roomId}`, chainObj)
}