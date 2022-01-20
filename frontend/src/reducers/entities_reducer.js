import { combineReducers } from "redux";
import RoomsReducer from './rooms_reducer';
import UsersReducer from "./users_reducer";
import PromptsReducer from "./prompts_reducer"
import DrawingsReducer from "./drawings_reducer";
import GuessesReducer from "./guesses_reducers";

const EntitiesReducer = combineReducers({
    rooms: RoomsReducer,
    users: UsersReducer,
    prompts: PromptsReducer,
    drawings: DrawingsReducer,
    guesses: GuessesReducer
});

export default EntitiesReducer;