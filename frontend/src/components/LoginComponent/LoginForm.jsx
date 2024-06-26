import React from 'react';
import { FaUserAlt, FaLock } from "react-icons/fa";
import './LoginForm.css';

const LoginForm = ({ username, setUsername, password, setPassword, error, handleSubmit }) => {
    return (
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
    );
};

export default LoginForm;
