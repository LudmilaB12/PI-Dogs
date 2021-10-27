const { API_KEY } = process.env
const axios = require('axios')
const { Temperament } = require('../db');



const getTemperament = async () => {
    let tempInDB = false;

    if(tempInDB === false) {
        let response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

        

        let dogTemperament = await response.data.map( temp => {
            if(temp.temperament){
                return temp.temperament
            }
        }).join().split(",")
        // acá se crea un array con todos los temperamentos de los perros de la api

        

        let temps = [] //declaro un array vacio donde estaran todos los temps

        dogTemperament.map( e => {
            if(!temps.includes(e.trim()) && e){
                temps.push(e.trim());
            }
        }) //pusheo los temperamentos sin los espacios y sin repetir

        temps.map( async (e) => {
            await Temperament.create({
                name: e
            })
        }) // aca creo cada temperamento en la tabla

        // console.log(temps)

        console.log("todo cargado a la db")

        tempInDB = true
    }else{
        console.log("Ya se encuentra todo cargado en la DB")
    }
}

module.exports= {
    getTemperament
}