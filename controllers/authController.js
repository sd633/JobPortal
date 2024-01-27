import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) =>{
        const { name, email, password } = req.body;

        if(!name){
            next("Name is required");
        }
        if(!password){
            next("Password is required");
        }
        if(!email){
            next("Email is required");
        }

        const existingUser = await userModel.findOne({ email });
        if(existingUser){
            next("User with this email already registered, please login")
        }
        
        const user = await userModel.create({ name, email, password });
        const token = user.createJWT()
        res.status(201).send({
            success: true,
            message: "New user created successfully",
            user:{
                name:user.name,
                lastName: user.lastName,
                email:user.email,
                location: user.location
            },
            token
        }) ;
}

export const loginController = async (req, res, next) =>{
    const{email, password} = req.body
    
    if(!email || !password){
        next("Please provide all the fields")
    }

    //find user by email
    const user = await userModel.findOne({ email }).select("+password");
    if(!user){
        next("Invalid username or password")
    }

    //compared password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        next("Invalid username or password");
    }

    user.password = undefined;

    const token = user.createJWT();
    res.status(200).json({
        success: true,
        message: "Login successful",
        user,
        token,
    })
}