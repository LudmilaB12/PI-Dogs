import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getDogByName } from "../actions";

import styles from "./SearchBar.module.css"
import { FaSearch } from "react-icons/fa"

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
        <div className={styles.container}>        
            <button className={styles.button} type="submit" onClick={ e => handleSubmit(e)} ><FaSearch/></button>
            <input type="text" placeholder="Buscar una raza" onChange={e => handleInputChange(e)} className={styles.input}/>
        </div>
    )
}