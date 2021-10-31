import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { getTemperament, postDog } from "../actions";
import { useSelector, useDispatch } from "react-redux";

//----------Validacion--------------

function validation(input){
    let errors = {}
    if(input.name === ""){
        errors.name = "Es necesario introducir un nombre!"
    }
    if( !input.minHeight && input.minHeight <= 0){
        errors.numMinHeight = "Es necesario introducir una medida mínima!"
    }
    if( !input.maxHeight ) {
        errors.numMaxHeight = "Es necesario introducir una medida máxima!"
    }
    if( !input.minWeight && input.minWeight <= 0) {
        errors.numMinWeight = "Es necesario introducir un peso mínimo!"
    }
    if( !input.maxWeight ) {
        errors.numMaxWeight = "Es necesario introducir un peso máximo!"
    }
    return errors;
}

export default function CreateDog(){
    const dispatch = useDispatch()
    const temp = useSelector( state => state.temps)

    const [input, setInput] = useState({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        lifeSpan: "",
        image: "",
        temperaments: []
    })
    const [errors, setErrors]= useState({})

    useEffect(() =>{
        dispatch(getTemperament())}, [dispatch]
    )


//--------Handle Inputs---------------
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validation({ //paso la funcion en el change para que se ejecute
            ...input,
            [e.target.name] : e.target.value
        }))
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
        if(input.name && input.minHeight >= 0 && input.minWeight >= 0 && parseInt(input.maxHeight) >= parseInt(input.minHeight) && parseInt(input.maxWeight) >= parseInt(input.minWeight)){
            dispatch(postDog(input))
            alert("Dogie creado correctamente")
            setInput({
                name: "",
                minHeight: "",
                maxHeight: "",
                minWeight: "",
                maxWeight: "",
                lifeSpan: "",
                image: "",
                temperaments: []
            })
        } else {
            alert("Algo salió mal, asegurate de haber llenado correctamente todos los campos obligatorios")
        }
    }

//--------Handle Delete ---------
    function handleDelete(el){
        setInput({
            ...input,
            temperaments: input.temperaments.filter( e => e !== el)
        })
    }


    return(

        <div>
           <Link to="/home"><button>Volver</button></Link>
           <h1>Crea tu propio Dogie</h1>
           <form>
               <div>
                   <label>Nombre:</label>
                   <input type="text" value={input.name} name="name" onChange={e => handleChange(e)} /> {
                       errors.name && ( //seteo mis errors
                           <p className="error">{errors.name}</p>
                       )
                   } 
               </div>
               <div>
                   <label>Altura Minima(cm):</label>
                   <input type="text" value={input.minHeight} name="minHeight" onChange={e => handleChange(e)}/>{
                       errors.numMinHeight && ( //seteo mis errors
                           <p className="error">{errors.numMinHeight}</p>
                       )
                   }
               </div>
               <div>
                   <label>Altura Máxima(cm):</label>
                   <input type="text" value={input.maxHeight} name="maxHeight" onChange={e => handleChange(e)}/>{
                       errors.numMaxHeight && ( //seteo mis errors
                           <p className="error">{errors.numMaxHeight}</p>
                       )
                   }
               </div>
               <div>
                   <label>Peso Minimo(kg):</label>
                   <input type="text" value={input.minWeight} name="minWeight" onChange={e => handleChange(e)}/>{
                       errors.numMinWeight && ( //seteo mis errors
                           <p className="error">{errors.numMinWeight}</p>
                       )
                   }
               </div>
               <div>
                   <label>Peso Máximo(kg):</label>
                   <input type="text" value={input.maxWeight} name="maxWeight" onChange={e => handleChange(e)}/>{
                       errors.numMaxWeight && ( //seteo mis errors
                           <p className="error">{errors.numMaxWeight}</p>
                       )
                   }

                  
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
                   <div>
                   { input.temperaments.map( el =>
                       <div key={el}>
                           <ul>{el}</ul>
                           <button onClick={() => handleDelete(el)}>x</button>
                       </div>  
                    )}
                    </div>
               </div>

               <button type="submit" onClick={ e => handleSubmit(e)}>Crear Dogie</button>

           </form>


        </div>

    )



}