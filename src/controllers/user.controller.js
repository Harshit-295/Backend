import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req,res)=>{
    // get user deatils from frontend
    // validation not empty 
    // check is already exist
    // check for images
    // upload on cloundaniary
    // create user object - create entry in db



    const {fullName , email,username,password}=req.body
    console.log("email",email);

    // if(fullName === ""){
    //     throw new ApiError(400,"FullName is required")
    // }

    if(
        [fullName,email,username,password].some((field) =>field?.trim()==="")
    ){
        throw new ApiError(400,"Some fileds are required")
    }

    const existedUser  = User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exist")

    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar files is required")
    }
    // if(!coverImageLocalPath){
    //     throw new ApiError(400,"coverIamge is not found")
    // }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    if(!avatar){
        throw new ApiError(400,"avatar not found")
    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.tolowerCase()
    })

    const createdUser = await User.findOne(user._.id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(400,"Something went wrong while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Succesfully")
    )


})

export {registerUser}