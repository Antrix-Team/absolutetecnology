import { useState, useEffect } from "react"
import { getCategories } from "../../api/CategoryProvider/CategoryProvider";
import { getCategoryWithSubcategories } from "../../api/SubcategoryProvider/SubcategoryProvider";

const UseCreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [createProduct, setCreateProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
});
const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [])

  useEffect(() => {
    if(selectCategory === "") return;
    fetchSubCategories();
  }, [selectCategory])

  const fetchCategories = async() => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSubCategories = async() => {
    const data = await getCategoryWithSubcategories(selectCategory);
    setSubCategories(data.subcategories);
  }

  const handleCreateProduct = (e) => {
    e.preventDefault();
    console.log(createProduct);
    console.log(selectCategory);
    console.log(selectSubCategory);
  }


  return { categories, handleCreateProduct, setSelectCategory,subCategories, setSelectSubCategory, setCreateProduct, createProduct, setImage, setSubCategories }
}

export default UseCreateProduct