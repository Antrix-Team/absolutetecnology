import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
})


const Product = mongoose.model('Product', ProductSchema)

export default Product