const initialState = {
    allDogs : [],
    dogs: [],
    temps: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_DOGS":
            return{
                ...state,
                allDogs: action.payload,
                dogs: action.payload
            }
        case "GET_BY_NAME":
            return{
                ...state,
                dogs: action.payload
            }
        case "GET_TEMPS":
            return{
                ...state,
                temps: action.payload
            }
        case "FILTER_TEMP":
            const console1 = state.allDogs
            console.log(console1)
            const allDogies = state.allDogs
            const allTemps = state.temps
            const filterTemps = action.payload === "allTemps" ? allTemps : allDogies.filter( e =>{
                if(e.created){
                   if( e.temperaments.includes(action.payload)){
                       return e
                   }
                   
                }else if(e.temperament && e.temperament.length && e.temperament.includes(action.payload)) return e
            })
            return{
                ...state,
                dogs: filterTemps

            }


        default:
            return state;
    }

}

export default rootReducer;