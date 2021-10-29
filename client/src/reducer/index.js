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
            const filterTemps = action.payload === "allTemps" || action.payload === "default" ? allDogies : allDogies.filter( e =>{
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
        case "SORT_BY_WEIGHT":
            function weightA(a){
                let arrWeight = a.weight.split("-") //acá me trae el string de los pesos y lo convierto en el array de num 
                if(arrWeight[0] && arrWeight[1]){
                    let sumWeight = parseInt(arrWeight[0].trim()) + parseInt(arrWeight[1].trim())
                    return sumWeight / 2
                } else {
                    return parseInt(arrWeight[0].trim())
                }
            }

            function weightB(b){
                let arrWeight = b.weight.split("-") //acá me trae el string de los pesos y lo convierto en el array de num 
                if(arrWeight[0] && arrWeight[1]){
                    let sumWeight = parseInt(arrWeight[0].trim()) + parseInt(arrWeight[1].trim())
                    return sumWeight / 2
                } else {
                    return parseInt(arrWeight[0].trim())
                }
            }

            let dogsWeight;

            if(action.payload === "AllW") {
                dogsWeight = state.allDogs
            }

            if(action.payload === "mayorW") {
                dogsWeight = state.dogs.sort(function(a, b){
                    return weightA(b) - weightB(a)
                })
            }
            if(action.payload === "menorW") {
                dogsWeight = state.dogs.sort(function(a, b){
                    return weightB(a) - weightA(b)
                })
            }



            return{
                ...state,
                dogs: dogsWeight
            }
        case "CREATED_OR_API":
            const allDogs = state.allDogs
            const filterDogs = action.payload === "allDogs" ? allDogs : allDogs.filter( e => {
                if(action.payload === "created"){
                    if(!e.created){
                        return e
                    }
                }else if(action.payload === "api"){
                    if(e.created){
                        return e
                    }
                }
            })

            return{
                ...state,
                dogs: filterDogs
            }
        case "SORT_BY_NAME":
            let sorted = action.payload === "A-Z"  ? 
            state.dogs.sort(function(a, b){
                if(a.name > b.name){
                    return 1
                }
                if(b.name > a.name){
                    return -1
                }
                return 0
            }) : state.dogs.sort(function(a, b){
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

        case "POST_DOG":
            return{
                ...state
            }
        default:
            return state;
    }

}

export default rootReducer;