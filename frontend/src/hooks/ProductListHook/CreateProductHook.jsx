import { useState, useEffect } from "react"
import { getCategories } from "../../api/CategoryProvider/CategoryProvider"

const UseCreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [])

  useEffect(() => {

  }, [])

  const fetchCategories = async() => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSubCategories = () => {}

  const handleCreateCategory = (e) => {
    e.preventDefault();
    console.log(selectCategory);
  }


  return { categories, handleCreateCategory, setSelectCategory }
}

export default UseCreateProduct