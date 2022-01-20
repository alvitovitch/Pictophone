import axios from 'axios'

export const fetchAllDrawings = () => {
    return axios.get("/api/drawings")
}

export const fetchDrawing = (drawingObj) => {
    return axios.get(`/api/drawings/${drawingObj.roomId},${drawingObj.chainId}` );
}

export const createDrawing = (drawing) => {
    return axios.post('/api/drawings', drawing)
}


//roomId=${drawingObj.roomId}&chainId=${drawingObj.chainId}