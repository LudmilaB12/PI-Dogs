import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getDogByName } from "../actions";

export default function SearchBar(){

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)

    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getDogByName(name))
    }

    return(
        <div>
            <input type="text" placeholder="Buscar una raza" onChange={e => handleInputChange(e)}/>
            <button type="submit" onClick={ e => handleSubmit(e)} >Buscar</button>
        </div>
    )
}