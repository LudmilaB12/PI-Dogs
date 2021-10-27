import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import {Link} from "react-router-dom";

import SearchBar from "./SearchBar";
import DogCard from "./DogCard";
import Paginado from "./Paginado";


export default function Home() {
    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs)
    const [currentPage, setCurrentPage] = useState(1); //seteo la pagina actual que arranca en 1
    const [dogsPerPage, setDogsPerPage] = useState(8); //seteo la cantidad de dogos por pagina
    const indexLastDog = currentPage * dogsPerPage; //índice del ultimo dogo que se muestra
    const indexFirstDog = indexLastDog - dogsPerPage; //índice del primer dogo
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog) //indico cuales son los dogos a renderizar

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(() =>{
        dispatch(getDogs())
    }, [dispatch])

   function handleClick(e){
        e.preventDefault()
        dispatch(getDogs)
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
                <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/>
            </div>

            { currentDogs?.map( e => {
                return(
                    <div>
                        <Link to={"/home" + e.id}>
                            <DogCard name={e.name} image={e.image.url} temp={e.temperament}/>
                        </Link>
                    </div>
                )
            })}

        </div>
    )
}
