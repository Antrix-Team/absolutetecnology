import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductListProvider from "../../api/ProductListProvider/ProductListProvider";

const useProductList = () => {
    const [Products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductListProvider();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            if (err.message.includes('Sesión expirada') || err.message.includes('no autorizada')) {
                navigate('/');
            } else {
                setError('Error en la carga de datos');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm]);

    const handleSearch = (term) => {
        if (!term) {
            fetchProducts();  
        } else {
            const filteredProducts = Products.filter((product) =>
                product.name.toLowerCase().includes(term.toLowerCase())
            );
            setProducts(filteredProducts);
        }
    };

    return { Products, loading, error, searchTerm, setSearchTerm };
};

export default useProductList;
