require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

const { allDogs } = require("../controllers/dogs")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async(req, res) =>{ //funciona con los de la api, faltan DB
    const { name } = req.query

    if(name) {
        try{
            const allDogies = await allDogs()
            let filterName = await allDogies.filter( e => e.name.toLowerCase().includes(name.toLowerCase()))
            console.log(filterName)
            res.status(200).send(filterName)
        }catch{
            res.status("404").send("No se ha encontrado un perro con ese nombre")
        }
    } else {
        const allDogies = await allDogs()
        res.status(200).send(allDogies)
    }
})

router.get('/dogs/:id', async(req, res) => {  //funciona probar con los db
    const { id } = req.params

    if(id){
        try{
            const totalDogs = await allDogs()
            let dogId = await totalDogs.filter(e => e.id == id)
            console.log(dogId)
            dogId.length ? res.status(200).send(dogId) : res.status(404).send("Perro no encontrado")
        } catch(err) {
            console.log(err)
        }
    }
})

router.post('/dog', async (req, res) => {
    let {
        id,
        name,
        height,
        weight,
        lifeSpan,
        image,
        temperaments
    } = req.body

    if(!name || !height || !weight ){
        res.status(404).send("Por favor completar los campos obligatorios")
    }
    try{
        let createDog = await Dog.create({
            name,
            height,
            weight,
            lifeSpan,
            image,
            temperaments
        })
        let temperamentDB = await Temperament.findAll({
            where: {
                name: temperaments
            }
        })
        createDog.addTemperament(temperamentDB)
        res.status(200).send("Raza de pero creada exitosamente")
    }catch(err){
        console.log(err)
    }
})
module.exports = router;
