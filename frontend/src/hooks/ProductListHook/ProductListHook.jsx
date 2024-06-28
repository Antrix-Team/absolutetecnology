import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductListProvider from "../../api/ProductListProvider/ProductListProvider";

const userProductList = () => {
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
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (term) => {
        const filteredProducts = Products.filter((product) =>
            product.name.includes(term)
        );
        setProducts(filteredProducts);
    };

    return { Products, loading, error, searchTerm, setSearchTerm, handleSearch };
};

export default userProductList;
