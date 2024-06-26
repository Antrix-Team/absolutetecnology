import axios from "axios";

const urlogin = import.meta.env.VITE_URL;

const login = async (credentials) => {
    try {
        const response = await axios.post(`${urlogin}/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200 && response.data.token) {
            localStorage.setItem('accessToken', response.data.token);
            console.log('Login successful, token stored in localStorage');
        } else {
            throw new Error('Hubo un problema al iniciar sesión');
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export default login;
