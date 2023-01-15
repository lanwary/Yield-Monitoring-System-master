import * as types from "./actionType";

const initialState = {
    records: [],
    record: {},
    msg: ""
}

const recordReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_RECORDS:
            return{
                ...state,
                records: action.payload,
            };

        case types.DELETE_RECORD:
            return {
                ...state,
                msg: action.payload,
            };
        case types.DELETE_RECORDS:
            return {
                ...state,
                msg: action.payload,
            };
            
        default:
            return state;
    }
}; 

export default recordReducer;