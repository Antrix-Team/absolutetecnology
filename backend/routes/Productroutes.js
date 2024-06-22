import AgregarProductos from "../controllers/ProductController.js";
import express from "express"

const rutas = express.Router()



rutas.post('/productos', AgregarProductos)

export default rutas