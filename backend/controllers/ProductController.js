import Product from "../models/ProductModel.js";


const AgregarProductos = async(req,res) => {
    
    const {nombre, precio , descripcion}= req.body
    try {
        const addproduct = await Product({nombre, precio , descripcion})
        addproduct.save()
        res.status(200).json("producto agregado")
    } catch (error) {
        console.error("error en el servidor", error);   
    }

}

export default AgregarProductos