import express from "express"
import mongodbConnect from "./database/mongodb.js"
import rutas from "./routes/Productroutes.js"



const URL = 3000
const server = express()
server.use(express.json())
server.use('/', rutas)
mongodbConnect()

server.listen(URL, () => {console.log(`corriendo en http://localhost:${URL}`);})