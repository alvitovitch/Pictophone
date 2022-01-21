import * as DrawingsApiUtils from '../util/drawings_api_utils'

export const RECEIVE_ALL_DRAWINGS = 'RECEIVE_ALL_DRAWINGS';
export const RECEIVE_DRAWING = 'RECEIVE_DRAWING'; 

const receiveAllDrawings = (drawings) => {
    return {
        type: RECEIVE_ALL_DRAWINGS,
        drawings
    }
}

const receiveDrawing = drawing => {
    return {
        type: RECEIVE_DRAWING,
        drawing
    }
}

export const requestAllDrawings = () => dispatch => {
    return DrawingsApiUtils.fetchAllDrawings()
        .then(drawings => dispatch(receiveAllDrawings(drawings)))
        .catch(err => console.log(err))
}

export const requestDrawing = (drawingObj) => dispatch => {
    return DrawingsApiUtils.fetchDrawing(drawingObj)
        .then(drawing => dispatch(receiveDrawing(drawing)))
        .catch(err => console.log(err))
}

export const createDrawing = drawing => dispatch => {
    console.log(drawing)
    return DrawingsApiUtils.createDrawing(drawing)
        .then(drawing => dispatch(receiveDrawing(drawing)))
        .catch(err => console.log(err))
}