import { 
CreateNewUser,
UpdatePassw,
UpdateUserById
} from '../../controllers/admin/CreateUserAndUpdate.js';

import { 
GetUserById,
GetUsers } from '../../controllers/admin/GetUserController.js';

import {
SendResetPasswordEmail,
VerifyResetTokenAndUpdatePassword} from '../../controllers/admin/ResetPasswordController.js';

import AccessLogin from '../../controllers/admin/AccessUserController.js';

import verifyToken from '../../middlewares/tokenUserAccess.js';

import express from 'express';


const routesUserAccess = express.Router();
  
//endpoint de registro
routesUserAccess.post('/userregister', CreateNewUser);

//endpoint para obtener un usuario por id
routesUserAccess.get('/users/:id', verifyToken, GetUserById);

//endpoint para obtener todos los usuarios
routesUserAccess.get('/users', verifyToken, GetUsers);

//endpoint para actualizar el usuario por id
routesUserAccess.put('/users/:id', verifyToken, UpdateUserById);

//endpoint para ingresar al sistema "LOGIN"
routesUserAccess.post('/login', AccessLogin);

//endpoint para actualizar la contraseña
routesUserAccess.put('/loginpassw', verifyToken, UpdatePassw);

//endpoint para enviar email si el usuario a olvidado la contraseña
routesUserAccess.post('/send-reset-password-email', SendResetPasswordEmail);

//endpoint para verificar el token recuperar la cuenta y actualizar la contraseña 
routesUserAccess.post('/verify-reset-password-token', VerifyResetTokenAndUpdatePassword);

//endpoint de una ruta protegida
routesUserAccess.get('/protected', verifyToken, (req, res) => {
    res.send(`Hola ${req.user.username}, esta es una ruta protegida.`);
  });
  
export default routesUserAccess;
  