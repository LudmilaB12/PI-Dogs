import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { getTemperament, postDog } from "../actions";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Create.module.css"
import paw3 from "./assets/paws (3).png"
import paw4 from "./assets/paws (4).png"


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
           <Link to="/home"><button className={styles.buttonBack}>Volver</button></Link>
           <div className={styles.container}>
               <img className={styles.paw3} src={paw3} alt=" " />
            <h1 className={styles.title}>Crea tu propio Dogie</h1>
           <form>
              
               <div className={styles.containerName}>

                   <label className={styles.text}>Nombre:</label>
                     <input className={styles.input} type="text" value={input.name} name="name" onChange={e => handleChange(e)} /> {
                       errors.name && ( //seteo mis errors
                           <p className="error">{errors.name}</p>
                       )
                   } 
               </div>
               <div className={styles.containerName}>
                   <label className={styles.text}>Altura Minima(cm):</label>
                   <input className={styles.input} type="text" value={input.minHeight} name="minHeight" onChange={e => handleChange(e)}/>{
                       errors.numMinHeight && ( //seteo mis errors
                           <p className="error">{errors.numMinHeight}</p>
                       )
                   }
               </div>
               <div className={styles.containerName}>
                   <label className={styles.text}>Altura Máxima(cm):</label>
                   <input className={styles.input} type="text" value={input.maxHeight} name="maxHeight" onChange={e => handleChange(e)}/>{
                       errors.numMaxHeight && ( //seteo mis errors
                           <p className="error">{errors.numMaxHeight}</p>
                       )
                   }
               </div>
               <div className={styles.containerName}>
                   <label className={styles.text}>Peso Minimo(kg):</label>
                   <input className={styles.input} type="text" value={input.minWeight} name="minWeight" onChange={e => handleChange(e)}/>{
                       errors.numMinWeight && ( //seteo mis errors
                           <p className="error">{errors.numMinWeight}</p>
                       )
                   }
               </div>
               <div className={styles.containerName}>
                   <label className={styles.text}>Peso Máximo(kg):</label>
                   <input className={styles.input} type="text" value={input.maxWeight} name="maxWeight" onChange={e => handleChange(e)}/>{
                       errors.numMaxWeight && ( //seteo mis errors
                           <p className="error">{errors.numMaxWeight}</p>
                       )
                   }

                  
               </div>
               <div className={styles.containerName}>
                   <label className={styles.text}>Años de vida:</label>
                   <input className={styles.input} type="text" value={input.lifeSpan} name="lifeSpan" onChange={e => handleChange(e)}></input>
               </div>
               <div className={styles.containerName}>
                   <label className={styles.text}>Url de la imagen:</label>
                   <input className={styles.input} type="text" value={input.image} name="image" onChange={e => handleChange(e)}></input>
               </div>
               <div className={styles.containerName}>
                   <select className={styles.select} onChange={ e => handleSelect(e)}>
                       { temp.map( e => {
                           return(
                            <option value={e}>{e}</option>
                           )
                       })}
                   </select>
                   <div className={styles.containerop}>
                   { input.temperaments.map( el =>
                       <div className={styles.options} key={el}>
                           <button className={styles.button} onClick={() => handleDelete(el)}>{el}</button>
                       </div>  
                    )                   
                    }
                    </div>
               </div>

           </form>

               <img className={styles.paw4} src={paw4} alt=" " />
           </div>
               <button className={styles.buttonCreate} type="submit" onClick={ e => handleSubmit(e)}>Crear Doggy Nuevo</button>

        </div>

    )



}