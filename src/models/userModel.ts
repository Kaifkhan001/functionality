import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken';


const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is required"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isVerified: {
        type: Boolean,
        default: false

    },
    VerifyTokenExpiry: Date
});

userSchema.methods.generateAccessToken = function (){
    try {
        return jwt.sign(
          { id: this._id, email: this.email },
          process.env.JWT_TOKEN_SECRET!,
          { expiresIn: process.env.JWT_TOKEN_EXPIRY }
        );
    } catch (error) {
        console.log("error while generating to Access token",error);
        return;
    }
}

userSchema.methods.generateUserInfoToken = function(){
    try {
        return jwt.sign(
          { id: this._id, fullName: this.fullName, email: this.email },
          process.env.JWT_TOKEN_SECRET!,
          {
            expiresIn: process.env.JWT_TOKEN_EXPIRY,
          }
        );
    } catch (error) {
        console.log("Error while generating user info token", error);
        return;
    }
}

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;