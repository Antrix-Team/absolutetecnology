import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../../api/loginProvider/loginProvider';

const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login({ username, passw: password });
            navigate('/dashboard');
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
