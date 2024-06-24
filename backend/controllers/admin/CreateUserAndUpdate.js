import UserModel from '../../models/userModel/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();


const CreateNewUser = async (req, res) => {
    const { name, middlename, mail, username, passw } = req.body;
    try {
        const hashpasw = await bcrypt.hash(passw, 10); 
        const NewUserAdd = new UserModel({ name, middlename, mail, username, passw: hashpasw });
        await NewUserAdd.save();
        
        
        const token = jwt.sign({ id: NewUserAdd._id, username: NewUserAdd.username }, process.env.SECRET_KEY, { expiresIn: '7d' });
        
        res.status(201).json({ token });
        console.log("add user is successfully");
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("has problem occurred in the server", error);
    }
};



const UpdateUserById = async (req, res) => {
    const { name, middlename, mail, username, passw } = req.body;
    const id = req.params.id;
    try {
        const updateUser = await UserModel.findByIdAndUpdate(id, { name, middlename, mail, username, passw }, { new: true });
        res.status(200).json(updateUser);
        console.log("user update is success");
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("has problem occurred in the server", error);
    }
};

const UpdatePassw = async (req, res) => {
    const { passw, mail } = req.body;
    try {
        const updateUser = await UserModel.findOneAndUpdate({ mail }, { passw }, { new: true });
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updateUser);
        console.log("User password update is successful");
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("A problem occurred in the server", error);
    }
};

export {CreateNewUser, UpdateUserById, UpdatePassw}