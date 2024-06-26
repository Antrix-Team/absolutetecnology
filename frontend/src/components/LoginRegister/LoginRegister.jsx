import "./LoginRegister.css";
import { FaUserAlt, FaLock} from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const LoginRegister = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>Registrar Usuario</h1>
                <div className='input-box'>
                    <input type="text" placeholder='Primer nombre' required/>
                    <FaUserAlt className='icon' />
                </div>

                <div className='input-box'>
                    <input type="text" placeholder='Segundo nombre' required/>
                    <FaUserAlt className='icon' />
                </div>

                <div className='input-box'>
                    <input type="email" placeholder='Correo' required/>
                    <MdEmail className='icon' />
                </div>

                <div className='input-box'>
                    <input type="text" placeholder='Usuario' required/>
                    <FaUserAlt className='icon' />
                </div>

                <div className='input-box'>
                    <input type="password" placeholder='Contraseña' required/>
                    <FaLock className='icon' />
                </div>

                <button type='submit'>Registrar</button>

            </form>
        </div>
    )
}

export default LoginRegister