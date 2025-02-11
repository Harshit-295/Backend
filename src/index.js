// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "./constants.js";
import {app} from './app.js'

import connectDB from "./db/index.js";
dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is runnig at port : ${process.env.PORT}`)
    })
})

.catch((err)=>{
    console.log("MOngo db connection failed!!!",err)
})
// import express from "express"
// const app = express()
// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",()=>{
//             console.log("ERRR",error)
//         })
//         app.listen(process.env.PORT , ()=>{
//             console.log(`App is listeing on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log(error<"ERROR")
//         throw err
//     }
// })()