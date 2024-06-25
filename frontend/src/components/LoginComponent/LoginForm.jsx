import React from 'react'
import './LoginForm.css';
import { FaUserAlt, FaLock} from "react-icons/fa";

const LoginForm = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>Inicio de Sesion</h1>
                <div className='input-box'>
                    <input type="text" placeholder='Usuario' required/>
                    <FaUserAlt className='icon' />
                </div>
                <div className='input-box'>
                    <input type="password" placeholder='Contraseña' required/>
                    <FaLock className='icon' />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#">¿Has olvidado tu contraseña?</a>
                </div>

                <button type='submit'>Acceder</button>

                <div className="register-link">
                    <p>¿No tienes una cuenta? <a href="#">Registrarse</a></p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm