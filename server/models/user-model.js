const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { date } = require("zod");


const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    dob:{
        type : String,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
})

// secure the password with the bcrypt
userSchema.pre("save", async function (next){
    if(!this.isModified('password')){
        next();
    }
    // this.password=await bcrypt.hash(this.password , 10);
    try {
        const saltRound = 10;
        const hash_password = await bcrypt.hash(this.password, saltRound);
        this.password = hash_password;
    } catch (error) {
        next(error);
    }

})

//JSON WEB TOKEN
userSchema.methods.generateToken = async function (){
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email:this.email,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"30d",
            }        
        );
    } catch (error) {
        console.error(error)
    }
};


//define the model or function name
const User = new mongoose.model("User",userSchema);
module.exports = User;