import { useState, useEffect } from 'react';
import { InventaryListProvider, CreateInventary, ProductsListProvider } from "../../api/InventaryProvider/InventaryProvider";

const useInventary = () => {
  const [inventories, setInventories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const data = await InventaryListProvider();
        setInventories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await ProductsListProvider();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInventories();
    fetchProducts();
  }, []);

  const createInventary = async (formData) => {
    try {
      const newInventary = await CreateInventary(formData);
      setInventories([...inventories, newInventary]);
      setValidationErrors({});
    } catch (error) {
      setError(error.message);
      if (error.message.includes("Invalid value")) {
        try {
          const parsedErrors = JSON.parse(error.message);
          const errors = parsedErrors.reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
          }, {});
          setValidationErrors(errors);
        } catch (parseError) {
          console.error('Error parsing validation errors:', parseError);
        }
      }
    }
  };

  return { inventories, products, createInventary, error, validationErrors };
};

export default useInventary;
