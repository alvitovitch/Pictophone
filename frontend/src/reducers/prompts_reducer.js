import {
    RECEIVE_ALL_PROMPTS
} from "../actions/prompts_actions"


const PromptsReducer = (oldState = {}, action ) => {
    Object.freeze(oldState)
    const nextState =Object.assign({}, oldState)

    switch (action.type) {
        case RECEIVE_ALL_PROMPTS:
            action.prompts.data.forEach(prompt => nextState[prompt._id] = prompt)
            return nextState
        default:
            return oldState
    }
}



export default PromptsReducer