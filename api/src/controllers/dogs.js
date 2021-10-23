const { API_KEY } = process.env
const axios = require('axios')
const { Dog, Temperament } = require('../db');
// const Dog = require('../models/Dog');

const getApiInfo = async () => {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    
    const dogInfo = await response.data.map( el => {
        return{
            id: el.id,
            name: el.name,
            height: el.height,
            weight: el.weight,
            lifeSpan: el.life_span,
            image: el.image,
        }
    })

    return dogInfo;
}

const getDBinfo = async () => {
    const dogInDB = await Dog.findAll()


    return dogInDB;
}

const allDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBinfo(); //me falta traerme el temperamento
    const allInfo = apiInfo.concat(dbInfo);


    return allInfo

}

module.exports = {
    allDogs
}