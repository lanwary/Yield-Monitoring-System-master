import * as types from "./actionType";
import axios from "axios";

const API ="http://localhost:80"

const getRecords = (records) => ({
    type: types.GET_RECORDS,
    payload: records
});

const recordDelete = (msg) => ({
    type: types.DELETE_RECORD,
    payload:msg,
});
const recordsDelete = (msg) => ({
    type: types.DELETE_RECORDS,
    payload:msg,
});

export const loadRecords = () => {
    return function(dispatch) {
        axios
            .get(`${API}/company/records`)
            .then((resp) => dispatch(getRecords(resp.data)))
            .catch(err => console.log(err.resp.data));
    };
};

export const deleteRecord =(id) =>{
    return function(dispatch){
        axios
            .delete(`${API}/company/records/${id}`)
            .then((resp) => {
                dispatch(recordDelete(resp.data.msg));
                dispatch(loadRecords());
            })
            .catch(err => console.log(err.resp.data))
    };
};
export const deleteRecords =(id) =>{
    return function(dispatch){
        axios.delete(`${API}/company/records`)
             .then((resp) => {
                dispatch(recordsDelete(resp.data.msg));
                dispatch(loadRecords());
            })
             .catch(err => console.log(err.resp.data))
    };
};