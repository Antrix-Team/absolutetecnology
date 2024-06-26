import axios from "axios";

const urlemployee = import.meta.env.VITE_URL;

const EmployeListProvider = async () => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await axios.get(`${urlemployee}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Sesión expirada o no autorizada. Por favor, inicie sesión nuevamente.');
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};

export default EmployeListProvider;