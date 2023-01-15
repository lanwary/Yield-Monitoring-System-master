import {combineReducers} from "redux";
import recordReducer from "./reducer";

const rootReducer = combineReducers({
    data: recordReducer
});

export default rootReducer;