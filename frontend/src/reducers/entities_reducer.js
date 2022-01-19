import { combineReducers } from "redux";
import RoomsReducer from './rooms_reducer';
import UsersReducer from "./users_reducer";
import PromptsReducer from "./prompts_reducer"

const EntitiesReducer = combineReducers({
    rooms: RoomsReducer,
    users: UsersReducer,
    prompts: PromptsReducer
});

export default EntitiesReducer;