import axios from "axios"


export const fetchAllUsers = () => {
    return axios.get('/api/users')
}

export const deleteUser = (user) => {
    debugger
    return axios.delete(`/api/users/${user.id}`)
}