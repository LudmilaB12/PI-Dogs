import axios from "axios";

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs")
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        })
    }
}

export function getDogByName(payload){
    return async function(dispatch){
        var response = await axios.get("http://localhost:3001/dogs?name=" + payload)
        return dispatch({
            type: "GET_BY_NAME",
            payload: response.data
        })
    }
}