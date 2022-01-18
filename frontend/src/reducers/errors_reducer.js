import { combineReducers } from "redux";
import RoomsErrorsReducer from "./rooms_errors_reducer";
import SessionErrorsReducer from './session_errors_reducer';

export default combineReducers({
    session: SessionErrorsReducer,
    rooms: RoomsErrorsReducer
});