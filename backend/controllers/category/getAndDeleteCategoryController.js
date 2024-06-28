import CategoryModel from "../../models/category/categoryModel.js";
import dotenv from "dotenv";
import SubcategoryModel from "../../models/subcategory/subcategoryModel.js";
import ProductModel from "../../models/product/productModel.js";

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
      return res.status(404).json({ message: "Categoria no encontrada" });
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
        return res.status(404).json({ message: "Categoria no encontrada" });
      }
  
      // Eliminar todas las subcategorías asociadas
      await SubcategoryModel.updateMany({ category: id, status: "ACTIVE" }, { status: "INACTIVE" });
  
      // Eliminar todos los productos asociados a las subcategorías
      const subcategories = await SubcategoryModel.find({ category: id });
      const subcategoryIds = subcategories.map(subcategory => subcategory._id);
      await ProductModel.updateMany({ subCategoryId: { $in: subcategoryIds }, status: "ACTIVE" }, { status: "INACTIVE" });
  
      category.status = "INACTIVE";
      await category.save();
  
      res.json({ message: "Categoría, subcategorías y productos relacionados eliminados correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
