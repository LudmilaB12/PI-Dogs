import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { getTemperament, postDog } from "../actions";
import { useSelector, useDispatch } from "react-redux";

export default function CreateDog(){
    const dispatch = useDispatch()
    const temp = useSelector( state => state.temps)

    const [input, setInput] = useState({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWidht: "",
        maxWidht: "",
        lifeSpan: "",
        image: "",
        temperaments: []
    })

    useEffect(() =>{
        dispatch(getTemperament())}, [dispatch]
    )


//--------Handle Inputs---------------
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
    }

//---------Handle Select ------------
    function handleSelect(e){
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
        console.log(input)
    }   
//--------Handle Submit-----------
    function handleSubmit(e){
        e.preventDefault()
        console.log(input)

        dispatch(postDog(input))
        alert("Dogie creado correctamente")

        setInput({
            name: "",
            minHeight: "",
            maxHeight: "",
            minWidht: "",
            maxWidht: "",
            lifeSpan: "",
            image: "",
            temperaments: []
        })
    }


    return(

        <div>
           <Link to="/home"><button>Volver</button></Link>
           <h1>Crea tu propio Dogie</h1>
           <form>
               <div>
                   <label>Nombre:</label>
                   <input type="text" value={input.name} name="name" onChange={e => handleChange(e)}></input>
               </div>
               <div>
                   <label>Altura Minima(cm):</label>
                   <input type="text" value={input.minHeight} name="minHeight" onChange={e => handleChange(e)}></input>
               </div>
               <div>
                   <label>Altura Máxima(cm):</label>
                   <input type="text" value={input.maxHeight} name="maxHeight" onChange={e => handleChange(e)}></input>
               </div>
               <div>
                   <label>Peso Minimo(kg):</label>
                   <input type="text" value={input.minWidht} name="minWidht" onChange={e => handleChange(e)}></input>
               </div>
               <div>
                   <label>Peso Máximo(kg):</label>
                   <input type="text" value={input.maxWidht} name="maxWidht" onChange={e => handleChange(e)}></input>
               </div>
               <div>
                   <label>Años de vida:</label>
                   <input type="text" value={input.lifeSpan} name="lifeSpan" onChange={e => handleChange(e)}></input>
               </div>
               <div>
                   <label>Url de la imagen:</label>
                   <input type="text" value={input.image} name="image" onChange={e => handleChange(e)}></input>
               </div>
               <div>
                   <select onChange={ e => handleSelect(e)}>
                       { temp.map( e => {
                           return(
                            <option value={e}>{e}</option>
                           )
                       })}
                   </select>
                   <ul><li>{input.temperaments.map( el => el + " ,")}</li></ul>
               </div>

               <button type="submit">Crear Dogie</button>

           </form>


        </div>

    )



}