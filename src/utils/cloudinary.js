import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";

// import { v2 as cloudinary } from 'cloudinary';
dotenv.config({ path: "../../.env" }); 

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null;
        //upload on cloundanary
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        // file haase been uploded 
        console.log("file is uploaded on cloudinary",
        response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)// rempove the locally saved temporary file as the upload 
        return null;
    }
}

export {uploadOnCloudinary}


// (async function() {


//     if (!process.env.CLOUDINARY_CLOUD_NAME || 
//         !process.env.CLOUDINARY_API_KEY || 
//         !process.env.CLOUDINARY_API_SECRET) {
//         throw new Error("Missing Cloudinary environment variables. Check your .env file.");
//     }

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key:process.env.CLOUDINARY_API_KEY , 
//         api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'sho',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('sho', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('sho', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();