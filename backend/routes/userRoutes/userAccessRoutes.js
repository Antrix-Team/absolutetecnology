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
import verifyToken from "../middleware/middleware.js";
  
const routesUserAccess = express.Router();
  
  
routesUserAccess.post('/userregister', CreateNewUser);
routesUserAccess.get('/users/:id', verifyToken, GetUserById);
routesUserAccess.get('/users', verifyToken, GetUsers);
routesUserAccess.put('/users/:id', verifyToken, UpdateUserById);
routesUserAccess.post('/login', AccessLogin);
routesUserAccess.put('/loginpassw', verifyToken, UpdatePassw);
  
routesUserAccess.post('/send-reset-password-email', SendResetPasswordEmail);
routesUserAccess.post('/verify-reset-password-token', VerifyResetTokenAndUpdatePassword);
  
routesUserAccess.get('/protected', verifyToken, (req, res) => {
    res.send(`Hola ${req.user.username}, esta es una ruta protegida.`);
  });
  
export default routesUserAccess;
  