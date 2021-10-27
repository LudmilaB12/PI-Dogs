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
        case "SORT_BY_NAME":
            let sorted = action.payload === "A-Z" ? 
            state.allDogs.sort(function(a, b){
                if(a.name > b.name){
                    return 1
                }
                if(b.name > a.name){
                    return -1
                }
                return 0
            }) : state.allDogs.sort(function(a, b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0
            })

            
            return({
                ...state,
                dogs: sorted

            })


        default:
            return state;
    }

}

export default rootReducer;