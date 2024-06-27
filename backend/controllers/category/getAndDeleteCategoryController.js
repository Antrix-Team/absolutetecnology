import CategoryModel from "../../models/category/categoryModel.js";
import dotenv from "dotenv";

dotenv.config();

export const GetCategories = async (req, res) => {
  const { category } = req.query;
  const queryFilter = { status: "ACTIVE" };

  if (category) {
    queryFilter.category = { $regex: category, $options: "i" };
  }

  try {
    const categories = await CategoryModel.find(queryFilter);
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const GetCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findOne({ _id: id, status: "ACTIVE" });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const DeleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findOne({ _id: id, status: "ACTIVE" });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.status = "INACTIVE";
    await category.save();

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
