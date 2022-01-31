import * as GameApiUtils from '../util/game_api_utils'

export const RECEIVE_GAME = 'RECEIVE_GAME'
export const REMOVE_GAME = 'REMOVE_GAME'
export const RECEIVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS'

const receiveGame = game => {
    return {
        type: RECEIVE_GAME,
        game
    }
}

const receiveGameErrors = errors => {
    return {
        type: RECEIVE_GAME_ERRORS,
        errors
    }
}

export const requestGame = roomId => dispatch => {
    return GameApiUtils.fetchGame(roomId)
        .then(game => dispatch(receiveGame(game)))
        .catch(err => dispatch(receiveGameErrors(err)))
}

export const createGame = game => dispatch => {
    return GameApiUtils.createGame(game)
        .then(game => dispatch(receiveGame(game)))
        .catch(err => dispatch(receiveGameErrors(err)))
}

export const updateGame = (gameObj) => dispatch => {
    return GameApiUtils.updateGame(gameObj.roomId, gameObj.chainObj)
        .then(game => dispatch(receiveGame(game)))
        .catch(err => dispatch(receiveGameErrors(err)))
}