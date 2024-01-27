import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Name is required']
    },

    lastname:{
        type: String,
    },

    email:{
        type: String,
        required:[true, 'Email is required'],
        unique:true,
        validate: validator.isEmail
    }, 

    password:{
        type: String,
        required:[true, 'Password is required'],
        minlength:[8, "Password should be greater than 8 characters"],
        select:true,
    },

    location:{
        type:String,
        default:'India'
    }
}, {timestamps: true}
);

//Password hashing middleware
userSchema.pre('save', async function(){
    if(!this.isModified) return; 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

userSchema.methods.createJWT = function(){
    return JWT.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
};

export default mongoose.model("User",userSchema);