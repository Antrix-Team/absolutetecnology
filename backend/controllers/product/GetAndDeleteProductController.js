import ProductModel from "../../models/product/productModel.js";
import dotenv from "dotenv";

dotenv.config();


export const GetProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ status: "ACTIVE" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const GetProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findOne({ _id: id, status: "ACTIVE" });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findOne({ _id: id, status: "ACTIVE" });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.status = "INACTIVE";
    await product.save();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
