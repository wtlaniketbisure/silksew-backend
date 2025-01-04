import userModel from "../model/userModel.js";
import bcrypt from "bcrypt"

const userRegister = async (req,res)=>{
    try {

        const {name,email, password} = req.body;
        console.log(name,email,password);

        
        if(
            [name, email,password].some((field) => field?.trim() === "")
        ){
            return res.json({err:"All fields are required"})
        }
        
        
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password,salt)
        console.log(hashedPassword)
        
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })
        const user = await newUser.save();

        res.json({success:true,message:"User successfully registered"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const userLogin = async (req, res)=>{
    try {
        const {email, password} = req.body;
        console.log(email, password);

        const user = await userModel.findOne({email});
        console.log(user);

        const match = await bcrypt.compare(password,user.password)
        

        if(!user){
            return res.json({success:false,message:"User not exit"})
        }

        res.json({success:true, message:"User login successfully"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {userRegister,userLogin}