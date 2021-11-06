import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions"
import { useEffect } from "react";

import styles from "./DogDetails.module.css"
import imagepaw from "./assets/paws (4).png"


export default function Detail(props){

    console.log(props)

    const dispatch = useDispatch()
    
    
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])
    
    const dogDetail = useSelector( state => state.detail)


    return(

        <div>

        <div className={styles.container}>
            

            {
                dogDetail.length > 0 ? <div className={styles.parentGrid}> 
                    <img className={styles.paw} src={imagepaw} alt=" " />

                    <div className={styles.img}>
                    <img src={dogDetail[0].image} alt="Image Not Found" />
                    </div>
                    <h1 className={styles.name}>{dogDetail[0].name}</h1>
                    <h2 className={styles.alt}>Altura: {dogDetail[0].height} cm</h2>
                    <h2 className={styles.pes}>Peso: {dogDetail[0].weight} kg</h2>
                    <h2 className={styles.vida}>Años de vida: {dogDetail[0].lifeSpan} </h2>
                    <h2 className={styles.temp}>Temperamentos: { !dogDetail[0].created ? dogDetail[0].temperament + " " : dogDetail[0].temperaments.map(e => e.name + (" ") ) }</h2>
                </div> : <p>Cargando...</p>

            }
   

        </div>
            <Link to="/home"><button className={styles.button}>Volver</button></Link>
        </div>
        


    )

}