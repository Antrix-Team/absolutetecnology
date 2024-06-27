import SubcategoryModel from "../../models/subcategory/subcategoryModel.js";
import dotenv from "dotenv";

dotenv.config();

export const GetSubcategories = async (req, res) => {
  const { subcategory } = req.query;
  const queryFilter = { status: "ACTIVE" };

  if (subcategory) {
    queryFilter.subcategory = { $regex: subcategory, $options: "i" };
  }

  try {
    const subcategories = await SubcategoryModel.find(queryFilter).populate('category', 'category description');
    res.json(subcategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const GetSubcategory = async (req, res) => {
  const { id } = req.params;
  try {
    const subcategory = await SubcategoryModel.findOne({ _id: id, status: "ACTIVE" }).populate('category', 'category description');

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    return res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const DeleteSubcategory = async (req, res) => {
  const { id } = req.params;
  try {
    const subcategory = await SubcategoryModel.findOne({ _id: id, status: "ACTIVE" });

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    subcategory.status = "INACTIVE";
    await subcategory.save();

    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
