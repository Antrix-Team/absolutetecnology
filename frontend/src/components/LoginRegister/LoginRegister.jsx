import "./LoginRegister.css";
import { FaUserAlt, FaLock, FaPhone } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 

const LoginRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        middlename: '',
        mail: '',
        username: '',
        phone: '',
        carnet: '',
        passw: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/userregister', formData, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}` 
                }
            });
            
            if (response.data.token) {
                Cookies.set('token', response.data.token, { path: '/' });
            } else {
                throw new Error('No se recibió token del servidor');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="bodyRegister">
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Registrar Usuario</h1>
                    <div className='input-box'>
                        <input type="text" name="name" placeholder='Primer nombre' value={formData.name} onChange={handleChange} required />
                        <FaUserAlt className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="text" name="middlename" placeholder='Segundo nombre' value={formData.middlename} onChange={handleChange} required />
                        <FaUserAlt className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="email" name="mail" placeholder='Correo' value={formData.mail} onChange={handleChange} required />
                        <FiMail className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="text" name="username" placeholder='Usuario' value={formData.username} onChange={handleChange} required />
                        <FaUserAlt className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="tel" name="phone" placeholder='Telefono' value={formData.phone} onChange={handleChange} required />
                        <FaPhone className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="text" name="carnet" placeholder='Carnet' value={formData.carnet} onChange={handleChange} required />
                        {/* Use a valid license icon component */}
                    </div>
                    <div className='input-box'>
                        <input type="password" name="passw" placeholder='Contraseña' value={formData.passw} onChange={handleChange} required />
                        <FaLock className='icon' />
                    </div>
                    <button type='submit'>Registrar</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default LoginRegister;
