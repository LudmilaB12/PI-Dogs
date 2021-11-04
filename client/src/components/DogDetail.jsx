import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions"
import { useEffect } from "react";


export default function Detail(props){

    console.log(props)

    const dispatch = useDispatch()
    
    
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])
    
    const dogDetail = useSelector( state => state.detail)


    return(
        
        <div>
            {
                dogDetail.length > 0 ? <div> 
                    <h1>Nombre: {dogDetail[0].name}</h1>
                    <img src={dogDetail[0].image} alt="Image Not Found" weight="200px" height="200px" />
                    <h3>Temperamentos: { !dogDetail[0].created ? dogDetail[0].temperament + " " : dogDetail[0].temperaments.map(e => e.name + (" ") ) }</h3>
                    <h2>Altura: {dogDetail[0].height} cm</h2>
                    <h2>Peso: {dogDetail[0].weight} kg</h2>
                    <h2>Años de vida en promedio: {dogDetail[0].lifeSpan} </h2>
                </div> : <p>Cargando...</p>

            }


            <Link to="/home"><button>Volver</button></Link>
        </div>


    )

}