require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

const { allDogs } = require("../controllers/dogs")
const { getTemperament } = require("../controllers/temperament")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async(req, res) =>{ //funciona 
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

router.get('/dogs/:id', async(req, res) => {  //funciona 
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

router.get('/temperament', async (req, res) =>{ //FUNCIONA
    

    try{
        const uploadTemps = await getTemperament()
        console.log(uploadTemps)

        const temps = await Temperament.findAll()
        const listTemp = await temps.map( e => e.name)

        console.log(listTemp)

        res.status(200).send(listTemp)
        
    } catch(err){
        console.log(err)
    }

    

})

router.post('/dog', async (req, res) => { //FUNCIONA
    let {
        id,
        name,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        lifeSpan,
        image,
        temperaments,
        created
    } = req.body

    if(!name || !minHeight || !maxHeight || !minWeight ||!maxWeight ){
        res.status(404).send("Por favor completar los campos obligatorios")
    }
    try{
        let height = minHeight + " - " + maxHeight
        let weight = minWeight + " - " + maxWeight

        let createDog = await Dog.create({
            name,
            height,
            weight,
            lifeSpan,
            image,
            created
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
