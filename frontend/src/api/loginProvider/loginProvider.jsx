import axios from "axios";
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;
const urlogin = import.meta.env.VITE_URL;

const login = async (credentials) => {
  try {
    const response = await axios.post(`${urlogin}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    
    // Guardar el token en una cookie del lado del cliente
    if (response.data.token) {
      Cookies.get('token', response.data.token, { path: '/' });
    }
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export default login;