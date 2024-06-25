import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { FaUserAlt, FaLock } from "react-icons/fa";
import login from '../../api/loginProvider/loginProvider';

const LoginForm = () => {
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

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Inicio de Sesion</h1>
                {error && <p className="error">{error}</p>}
                <div className='input-box'>
                    <input 
                        type="text" 
                        placeholder='Usuario' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    <FaUserAlt className='icon' />
                </div>
                <div className='input-box'>
                    <input 
                        type="password" 
                        placeholder='Contraseña' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <FaLock className='icon' />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#">¿Has olvidado tu contraseña?</a>
                </div>

                <button type='submit'>Acceder</button>

            </form>
        </div>
    );
};

export default LoginForm;
