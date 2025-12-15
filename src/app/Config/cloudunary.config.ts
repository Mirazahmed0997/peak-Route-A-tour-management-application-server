import { v2 as cloudinary } from "cloudinary";
import { envVars } from "./env";
import AppError from "../errorHelper/AppError";
import stream from "stream";

// export interface IcloudinaryResult {
//   url: string,
//   secure_url: string,
//   asset_folder: string,
//   display_name: string,
//   original_filename: string,
// }

cloudinary.config({
    cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET
})


export const uploadBufferToCloudinary = async (buffer: Buffer, fileName: string) => {
    try {

        return new Promise((resolve,reject)=>
        {
            const public_id=`pdf=${fileName}=${Date.now()}`
            const bufferStream= new stream.PassThrough();
                bufferStream.end(buffer)

                cloudinary.uploader.upload_stream({
                    resource_type:"auto",
                    public_id:public_id,
                    folder:"pdf"
                },
                (error,result)=>
                {
                    if(error)
                    {
                        return reject(error)
                    }
                    resolve(result)
                }
            ).end(buffer)
        })

    } catch (error: any) {
        console.log(error)
        throw new AppError(401, `Error uploading file ${error.message}`)
    }
}


export const deletImageFromCloudinary = async (url: string) => {
    try {
        const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i
        const match = url.match(regex)

        if (match && match[1]) {
            const public_id = match[1];
            await cloudinary.uploader.destroy(public_id)
            console.log(`File ${public_id} is deleted from cloudinary`)
        }
    } catch (error: any) {
        throw new AppError(401, "Cloudinary Image deletion failed", error.message)
    }
}


export const cloudinaryUpload = cloudinary


