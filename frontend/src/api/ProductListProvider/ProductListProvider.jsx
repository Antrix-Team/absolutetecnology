import axios from "axios";

const urlemployee = import.meta.env.VITE_URL;

const ProductListProvider = async () => {
    try {
        const response = await axios.get(`${urlemployee}/products`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true 
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Sesión expirada o no autorizada. Por favor, inicie sesión nuevamente.');
        }
        throw new Error(error.response?.data?.message || error.message);
    }
};

export default ProductListProvider;
