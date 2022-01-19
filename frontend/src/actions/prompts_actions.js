import * as PromptsApiUtils from '../util/prompts_util'

export const RECEIVE_ALL_PROMPTS = 'RECEIVE_ALL_PROMPTS'
export const RECEIVE_PROMPT_ERRORS = 'RECEIVE_PROMPT_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'


const receiveAllPrompts = prompts => {
    return {
        type: RECEIVE_ALL_PROMPTS,
        prompts
    }
}

const receiveErrors = errors => {
    return {
        type: RECEIVE_PROMPT_ERRORS,
        errors
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}

export const requestAllPrompts = () => dispatch => {
    return PromptsApiUtils.fetchAllPrompts()
    .then(prompts => dispatch(receiveAllPrompts(prompts)))
    .catch(errors => dispatch(receiveErrors(errors.response.data)))
}