import "./LoginRegister.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from 'react';

const LoginRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        middlename: '',
        mail: '',
        username: '',
        passw: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/userregister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Usuario registrado con éxito');
                console.log('Token:', result.token);
            } else {
                alert('Error en el registro');
                console.error('Server response:', response);
            }
        } catch (error) {
            alert('Error en la conexión');
            console.error('Connection error:', error);
        }
    };

    return (
        <div className="bodyRegister">
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Registrar Usuario</h1>
                    <div className='input-box'>
                        <input type="text" name="name" placeholder='Primer nombre' value={formData.name} onChange={handleChange} required/>
                        <FaUserAlt className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="text" name="middlename" placeholder='Segundo nombre' value={formData.middlename} onChange={handleChange} required/>
                        <FaUserAlt className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="email" name="mail" placeholder='Correo' value={formData.mail} onChange={handleChange} required/>
                        <MdEmail className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="text" name="username" placeholder='Usuario' value={formData.username} onChange={handleChange} required/>
                        <FaUserAlt className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="password" name="passw" placeholder='Contraseña' value={formData.passw} onChange={handleChange} required/>
                        <FaLock className='icon' />
                    </div>
                    <button type='submit'>Registrar</button>
                </form>
            </div>
        </div>
    )
}

export default LoginRegister;
