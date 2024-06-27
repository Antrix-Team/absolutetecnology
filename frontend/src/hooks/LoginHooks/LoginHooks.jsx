import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import login from "../../api/loginProvider/loginProvider";

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ username, passw: password });
      if (response.token) {
        Cookies.set('token', response.token, { path: '/' });
        navigate('/dashboard');
      } else {
        throw new Error('No se recibió token del servidor');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit
  };
};

export default useLogin;