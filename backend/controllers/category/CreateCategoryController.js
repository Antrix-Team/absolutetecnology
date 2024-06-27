import CategoryModel from "../../models/category/categoryModel.js";
import dotenv from "dotenv";
dotenv.config();

export const CreateCategory = async (req, res) => {
  const { category, description } = req.body;
  const { id } = req.user;

  if (!category || !description) {
    return res.status(400).json({ message: "Category and description are required" });
  }

  try {
    console.log("Request Body: ", req.body);

    // Verificar si la categoría ya existe
    const existingCategory = await CategoryModel.findOne({ category });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new CategoryModel({
      category,
      description,
      createdBy: id,
      updatedBy: id,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
