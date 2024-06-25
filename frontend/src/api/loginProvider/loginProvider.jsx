import axios from 'axios';

const login = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:3000/api/login', credentials, {
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
