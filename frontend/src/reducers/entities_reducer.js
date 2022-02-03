import { combineReducers } from "redux";
import RoomsReducer from './rooms_reducer';
import UsersReducer from "./users_reducer";
import PromptsReducer from "./prompts_reducer"
import DrawingsReducer from "./drawings_reducer";
import GuessesReducer from "./guesses_reducers";
import GameReducer from "./games_reducer";
import DemoReducer from "./demos_reducer";

const EntitiesReducer = combineReducers({
    rooms: RoomsReducer,
    games: GameReducer,
    demos: DemoReducer,
    users: UsersReducer,
    prompts: PromptsReducer,
    drawings: DrawingsReducer,
    guesses: GuessesReducer
});

export default EntitiesReducer;