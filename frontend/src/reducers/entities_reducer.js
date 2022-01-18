import { combineReducers } from "redux";
import RoomsReducer from './rooms_reducer';
import UsersReducer from "./users_reducer";

const EntitiesReducer = combineReducers({
    rooms: RoomsReducer,
    users: UsersReducer
});

export default EntitiesReducer;