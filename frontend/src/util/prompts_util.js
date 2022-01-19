import axios from 'axios'

export const fetchAllPrompts = () => {
    return axios.get("/api/prompts")
}