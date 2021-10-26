const initialState = {
    allDogs : [],
    dogs: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_DOGS":
            return{
                ...state,
                allDogs: action.payload,
                dogs: action.payload
            }

        default:
            return state;
    }

}

export default rootReducer;