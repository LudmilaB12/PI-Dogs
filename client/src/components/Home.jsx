import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperament, filterByTemp, sortByName, filterCreatedOrNot, sortByWeight } from "../actions";
import {Link} from "react-router-dom";

import SearchBar from "./SearchBar";
import DogCard from "./DogCard";
import Paginado from "./Paginado";


export default function Home() {
    const dispatch = useDispatch();

//-------Los estados que necesito--------

    const temperament = useSelector( state => state.temps)

    const allDogs = useSelector((state) => state.dogs)

//--------PARA EL RENDER DE LOS SORTS---------

    const [order, setOrder] = useState('') //para renderizar cuando hacemos el orden 

//---------PAGINADO---------

    const [currentPage, setCurrentPage] = useState(1); //seteo la pagina actual que arranca en 1
    const [dogsPerPage, setDogsPerPage] = useState(8); //seteo la cantidad de dogos por pagina
    const indexLastDog = currentPage * dogsPerPage; //índice del ultimo dogo que se muestra
    const indexFirstDog = indexLastDog - dogsPerPage; //índice del primer dogo
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog) //indico cuales son los dogos a renderizar

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

//------- Los llamados que necesito cada que renderizo home------
    useEffect(() =>{
        dispatch(getDogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemperament())
    }, [dispatch])

// --------Vuelve a cargar todos los perros-------
   
    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs())
    }
    
//--------Handle filtros por temp--------
    
    function handleFilterValue(e){
        dispatch(filterByTemp(e.target.value))
    }

//-------Hanlde por name--------
    
    function handleSortName(e){
        e.preventDefault()
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

//------Handle por creada o traida de la api------

    function handleFilterCreated(e){
        e.preventDefault()
        dispatch(filterCreatedOrNot(e.target.value))
    }

//-----------Hanlde Sort by Weight-----------------
   function handleSortByWeight(e){
        e.preventDefault()
        dispatch(sortByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
}


    return(
        <div>
            <div>
                <Link to="/crear-raza">Agrega una raza de perro</Link>
            </div>
    
            <div><h1>¡Bienvenidos a The Dogie App</h1></div>

            <SearchBar/>
            <button onClick={e => handleClick(e)}>Volver a cargar todos los perros</button>

            <div>
                <select defaultValue="default" onChange={e => handleFilterValue(e)}>
                    <option value="default" >Filtrar por temperamento</option>
                    <option value="allTemps" key="allTemps" >Todos los temperamentos</option>
                    {
                        temperament && temperament.map( e =>
                            <option value={e} key={e}>{e} </option>)
 
                    }
                </select>
                <select onChange={e => handleSortName(e)} >
                    <option value="A-Z" >A - Z</option>
                    <option value="Z-A"  >Z - A</option>
                </select>
                <select onChange={ e => handleFilterCreated(e)}>
                    <option value="allDogs">Todas las razas</option>
                    <option value="created">Razas cargadas</option>
                    <option value="api">Razas creadas</option>
                </select>
                <select onChange= { e => handleSortByWeight(e)}>
                    <option value="AllW">Ordenar por peso</option>
                    <option value="mayorW">Mayor peso</option>
                    <option value="menorW">Menor peso</option>
                </select>
            </div>


            <div>
                <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/>
            </div>

            { currentDogs?.map( e => {
                return(
                    <div>
                        <Link to={"/home" + e.id}>
                            <DogCard name={e.name} image={e.image} temp={e.temperament}/>
                        </Link>
                    </div>
                )
            })}

        </div>
    )
}
