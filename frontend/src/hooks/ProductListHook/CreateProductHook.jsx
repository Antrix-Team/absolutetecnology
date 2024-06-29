import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/CategoryProvider/CategoryProvider";
import { getCategoryWithSubcategories } from "../../api/SubcategoryProvider/SubcategoryProvider";
import { CreateProduct } from "../../api/ProductListProvider/ProductListProvider";

const UseCreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [errorForm, setErrorForm] = useState("");
  const [createProduct, setCreateProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();


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

  const handleCreateProduct = async(e, setIsModelOpen, setProducts) => {
    e.preventDefault();
    if(createProduct.name.trim() === "" || createProduct.description.trim() === "" || createProduct.brand.trim() === "" || createProduct.price <= 0 || selectCategory === "" || selectSubCategory === "" || image === null ) {
      setErrorForm("Todos los campos son obligatorios")
      return;
    }

    console.log(selectSubCategory, selectCategory, createProduct, image);
    setErrorForm("");

    const formData = new FormData();
    formData.append("name", createProduct.name);
    formData.append("description", createProduct.description);
    formData.append("brand", createProduct.brand);
    formData.append("price", createProduct.price);
    formData.append("categoryId", selectCategory);
    formData.append("subCategoryId", selectSubCategory);
    formData.append("image", image);

    try {
      const response = await CreateProduct(formData);
      console.log(response);
      setCreateProduct({
        name: "",
        description: "",
        brand: "",
        price: 0,});

      setCategories([]);
      setSubCategories([]);
      setSelectCategory("");
      setSelectSubCategory("");
      setImage(null);
      alert("Product agregado correctamente");
      setIsModelOpen(false);
      setProducts((prevState) => ([...prevState, response]));
    } catch (error) {
      console.log(error);
      navigate("/dashboard/products");
    }

  }

  return { categories, handleCreateProduct, setSelectCategory,subCategories, setSelectSubCategory, setCreateProduct, createProduct, setImage, setSubCategories, errorImage, setErrorImage, errorForm, setErrorForm }
}

export default UseCreateProduct