import crypto from "crypto"
import { redisClient } from "../../Config/redis.config"
import { sendEmail } from "../../Utils/sendEmail"
import AppError from "../../errorHelper/AppError"
import { User } from "../User/User.model"

const OTP_EXPIRATION = 2 * 60

const generateOTP = async (length = 6) => {
    const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString()
    return otp

}

const sendOTP = async (email: string) => {


    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError(404, 'User not found')
    }
    if (user.isVerified) {
        throw new AppError(401, `${email} is Already Veryfied`)
    }

    const otp = await generateOTP()
    const redisKey = `otp:${email}`

    await redisClient.set(redisKey, otp, {
        expiration: {
            type: "EX",
            value: OTP_EXPIRATION
        }
    })

    await sendEmail({
        to: email,
        subject: "Your OTP Code",
        templateName: "otpTmeplate",
        templateData: {
            otp: otp
        }
    })

}
const veryfyOTP = async (email: string, otp: string) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError(404, 'User not found')
    }
    if (user.isVerified) {
        throw new AppError(401, `${email} is Already Veryfied`)
    }

    const redisKey = `otp:${email}`
    const savedOtp = await redisClient.get(redisKey)

    if (!savedOtp) {
        throw new AppError(401, "invalid OTP")
    }

    if (savedOtp !== otp) {
        throw new AppError(401, "invalid OTP")
    }



    await Promise.all([
        User.updateOne({ email }, { isVerified: true }, { runValidators: true }),
        redisClient.del([redisKey])
    ])


    return {}

}


export const otpService = {
    sendOTP,
    veryfyOTP
}