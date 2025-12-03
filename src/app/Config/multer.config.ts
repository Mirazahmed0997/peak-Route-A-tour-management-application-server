import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudunary.config";



const storage= new CloudinaryStorage({
    cloudinary:cloudinaryUpload,
    params:{
        public_id:(req,file)=>{
            const fileName=file.originalname
            .toLowerCase()
            .replace(/\s+/g,"-") //removed empty space using regex
            .replace(/\./g,"-")  //removed dot using regex
            .replace(/[^a-z0-9\-\.]/g,"") //removed non alpha numaric - !@$

           const extention= file.originalname.split('.').pop()

           const uniqueFileName= Math.random().toString(36).substring(2) + Date.now()+"-"+fileName +"."+extention

           return uniqueFileName
        }
    }
})


export const multerUpload =multer({
    storage:storage
})