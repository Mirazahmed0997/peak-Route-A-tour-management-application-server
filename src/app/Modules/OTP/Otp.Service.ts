import crypto from "crypto"
import { redisClient } from "../../Config/redis.config"
import { sendEmail } from "../../Utils/sendEmail"

const OTP_EXPIRATION = 2 * 60

const generateOTP = async (length = 6) => {
    const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString()
    return otp

}

const sendOTP = async (email: string, name: string) => {
    const otp = await generateOTP()
    const redisKey= `otp:${email}`

    await redisClient.set(redisKey, otp,{
        expiration:{
            type:"EX",
            value:OTP_EXPIRATION
        }
    })

    await sendEmail({
        to:email,
        subject:"Your OTP Code",
        templateName:"otpTmeplate",
        templateData:{
            name:name,
            otp:otp
        }
    })

}
const veryfyOTP = async () => {


    return {}

}


export const otpService = {
    sendOTP,
    veryfyOTP
}