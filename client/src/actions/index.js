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

export function getTemperament (){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/temperament")
        return dispatch({
            type: "GET_TEMPS",
            payload: json.data
        })
    }
}

export function filterByTemp(payload) {
    return ({
        type: "FILTER_TEMP",
        payload
    })
}

export function sortByName(payload){
    return({
        type: "SORT_BY_NAME",
        payload
    })

}

export function filterCreatedOrNot (payload){
    return({
        type: "CREATED_OR_API",
        payload
    })

}

export function sortByWeight (payload){
    return({
        type: "SORT_BY_WEIGHT",
        payload
    })

}