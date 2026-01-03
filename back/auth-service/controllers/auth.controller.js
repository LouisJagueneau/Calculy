//import library
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

//import Model
import User from "../models/User";

export const register = async (req, res) => {

    try {
        const { username, email, password} = req.body;

        const existingUser = await User.findOne({ where: { email } })
        if(existingUser) {
            return res.status(400).json({ msg:"An account already exist with this email"})
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({username: username, password: password, email: email});

        res.status(201).json({msg:'New user created successfully', user: username});

    } catch(error) {
        console.log(error);
        res.status(500).json({msg : "Error during registraction"})
    }
}

export const login = async (req, res) => {

    const { email, password} = req.body;

    try {
        const user = await User.findOne({where: {email} })
        if(!user || bcrypt.compareSync(password, user.password)) {
            return res.status(401).json("Error : Invalid email or password")
        }

        //Generate tokens 
        const accessToken = jwt.sign({username: username, email:email}, process.env.JWT_KEY, { expiresIn: "1h"});
        const refreshToken = jwt.sign({username: username, email:email}, process.env.JWT_REFRESH, { expiresIn: "7d"}) 

        //Register resfreshToken in DB
        user.refreshToken = refreshToken;
        await user.save();

        //Answer
        res.status(201).json({msg:"Login successfull!", accessToken, refreshToken})

    } catch(error) {
        console.log(error);
        res.status(500).json({msg: "Error during login"})
    }

}