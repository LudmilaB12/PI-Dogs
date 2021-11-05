import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperament, filterByTemp, sortByName, filterCreatedOrNot, sortByWeight } from "../actions";
import {Link} from "react-router-dom";

import SearchBar from "./SearchBar";
import DogCard from "./DogCard";
import Paginado from "./Paginado";

import styles from "./Home.module.css"
import logo from "./assets/Logo2.png"
import paw from "./assets/paws (4).png"


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
            <div className={styles.banner}>
               <img src={logo} alt=" " className={styles.logo}/>
               
               <div className={styles.containerCreateB}>
                   <img src={paw} alt = " " className={styles.img}/>
                   <Link to="/crear-raza" style={{ textDecoration: 'none' }}><button className={styles.createbutton}>Crea tu propio Doggy</button></Link>
               </div>
               
               <SearchBar/>

            </div>
    



            <div className={styles.nav}>
                <button onClick={e => handleClick(e)} className={styles.rechargeButton}>Volver a cargar todos los perros</button>
                
                <select defaultValue="default" onChange={e => handleFilterValue(e)} className={styles.selectcss}>
                    <option value="default" >Filtrar por temperamento</option>
                    <option value="allTemps" key="allTemps" >Todos los temperamentos</option>
                    {
                        temperament && temperament.map( e =>
                            <option value={e} key={e}>{e} </option>)
                            
                    }
                </select>
                <select onChange={e => handleSortName(e)} className={styles.selectcss} >
                    <option value="A-Z" >A - Z</option>
                    <option value="Z-A"  >Z - A</option>
                </select>
                <select onChange={ e => handleFilterCreated(e)} className={styles.selectcss}>
                    <option value="allDogs">Todas las razas</option>
                    <option value="created">Razas cargadas</option>
                    <option value="api">Razas creadas</option>
                </select>
                <select onChange= { e => handleSortByWeight(e)} className={styles.selectcss}>
                    <option value="AllW">Ordenar por peso</option>
                    <option value="mayorW">Mayor peso</option>
                    <option value="menorW">Menor peso</option>
                </select>
            </div>


            <div className={styles.pages}>
                <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/>
            </div>
          
          <div className={styles.cards}>

            { currentDogs?.map( e => {
                return(
                    

                     <div>
                        <Link to={"/dogs/" + e.id}>
                            <DogCard name={e.name} image={e.image} temp={e.created? e.temperaments.map( e => e.name + ",  ") : e.temperament}/>
                        </Link>
                    </div>
                    
                )
            })}
          </div>

        </div>
    )
}
