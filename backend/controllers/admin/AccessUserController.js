import UserModel from '../../models/userModel/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const AccessLogin = async (req, res) => {
    const { username, passw } = req.body;


    if (!username || !passw) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

 
        if (!user.passw) {
            return res.status(500).send('User password is not set');
        }

        const isMatch = await bcrypt.compare(passw, user.passw);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '7d' });
        res.json({ token });
        console.log("User logged in successfully");
    } catch (error) {
        res.status(500).send('Server error');
        console.error("Error in the server", error);
    }
};

export default AccessLogin;
