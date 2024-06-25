import ProductModel from "../../models/product/productModel.js";
import dotenv from "dotenv";
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
