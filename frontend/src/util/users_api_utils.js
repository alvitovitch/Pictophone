import axios from "axios"


export const fetchAllUsers = () => {
    return axios.get('/api/users')
}

export const deleteUser = (userId) => {
    return axios.delete(`/api/users/${userId}`)
}