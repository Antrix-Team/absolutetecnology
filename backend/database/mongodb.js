import mongoose from "mongoose";
import dotenv from "dotenv";

const url = "mongodb://localhost:27017/absolutetecnology"

const mongodbConnect =  async()=> {
    try {
        await mongoose.connect(url)
        console.log("conexión exitosa");
    } catch (error) {
        console.error("conexión fallida");
    }
}

export default mongodbConnect