import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductListProvider from "../../api/ProductListProvider/ProductListProvider";

const userProductList = () => {
    const [Products, setProducts] = useState([]);
    const [isModelOpen, setIsModelOpen] = useState(false);
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

    const handleCreateProduct = (event) => {
        event.preventDefault();
        console.log("Adding product");
    }

    const openModal = () => {
        console.log("HELLO")
        setIsModelOpen(true);
    }

    const closeModal = () => {
        setIsModelOpen(false);
    }

    return { Products, loading, error, searchTerm, setSearchTerm, handleSearch,handleCreateProduct, isModelOpen, setIsModelOpen, openModal, closeModal };
};

export default userProductList;
