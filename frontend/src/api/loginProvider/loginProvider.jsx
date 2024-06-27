import axios from "axios";

const urlogin = import.meta.env.VITE_URL;

const login = async (credentials) => {
    try {
        const response = await axios.post(`${urlogin}/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true // Permitir el envío y recepción de cookies
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export default login;
