import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import {Link} from "react-router-dom";

import SearchBar from "./SearchBar";
import DogCard from "./DogCard";


export default function Home() {
    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs)

    useEffect(() =>{
        dispatch(getDogs())
    }, [dispatch])
    



    return(
        <div>
            <div>
                <Link to="/crear-raza">Agrega una raza de perro</Link>
            </div>
    
            <div><h1>¡Bienvenidos a The Dogie App</h1></div>

            <SearchBar/>

            { allDogs?.map( e => {
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
