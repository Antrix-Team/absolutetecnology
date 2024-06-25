import ProductModel from "../../models/product/productModel.js";
import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
dotenv.config();

export const CreateProduct = async (req, res) => {
  const { name, description, brand, price, categoryId, subCategoryId } =
    req.body;
  const { id } = req.user;
  const image = req.file.filename;

  try {
    const newProduct = new ProductModel({
      name,
      description,
      brand,
      price,
      categoryId,
      subCategoryId,
      image: `${process.env.HOST}/uploads/${image}`,
      createdBy: id,
      updatedBy: id,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

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

export const UpdateProduct = async (req, res) => {
  const { description, brand, price, categoryId, subCategoryId } = req.body;
  const { id } = req.params;
  const user = req.user;
  console.log(id);
  try {
    const product = await ProductModel.findOne({ _id: id, status: "ACTIVE" });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.price = price || product.price;
    product.categoryId = categoryId || product.categoryId;
    product.subCategoryId = subCategoryId || product.subCategoryId;
    product.updatedBy = user.id;

    await product.save();

    res.json(product);
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

export const UpdateImageProduct = async (req, res) => {
  const { id } = req.params;
  const image = req.file.filename;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const uploadPath = path.join(__dirname, "..", "..", "uploads");
  try {
    const product = await ProductModel.findOne({ _id: id, status: "ACTIVE" });
    if (!product) {
      await fs.unlink(path.join(uploadPath, image));
      return res.status(404).json({ message: "Product not found" });
    }
    const productImage = product.image.split("/").pop();
    await fs.unlink(path.join(uploadPath, productImage));

    product.image = `${process.env.HOST}/uploads/${image}`;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
