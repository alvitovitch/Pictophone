import { combineReducers } from "redux";
import RoomsReducer from './rooms_reducer';


const EntitiesReducer = combineReducers({
    rooms: RoomsReducer
});

export default EntitiesReducer;