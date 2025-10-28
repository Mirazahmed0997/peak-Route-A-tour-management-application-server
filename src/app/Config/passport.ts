import passport from "passport";
import { envVars } from "./env";
import { User } from "../Modules/User/User.model";
import { Role } from "../Modules/User/User.interface";
import   { Strategy as GoogleStrategy, VerifyCallback,Profile }  from 'passport-google-oauth20';
import { Strategy as localStrategy } from "passport-local";
import AppError from "../errorHelper/AppError";
import  httpStatus  from 'http-status-codes';
import  bcryptjs  from 'bcryptjs';



passport.use(
    new localStrategy({
        usernameField: "email",
        passwordField: "password"
    },async (email: string,password:string,done: any)=>{
        try {
              const isUserExist= await User.findOne({email})
        if(!isUserExist)
            {
                
                return done(null,false,{message: "USER  DOES NOT EXIST"})
                // return done("User does not exist")
            } 

        const isGoogleAuthenticated = isUserExist.auths.some(provideObjects=>provideObjects.provider==="google")

        if(isGoogleAuthenticated && !isUserExist.password)
        {
            return done(null,false,{message:"You have authenticated through google. So Please google login first and then set a password for your gmail account"})
        }


        const isPassordMatched=await bcryptjs.compare(password as string,isUserExist.password as string)

        if(!isPassordMatched)
        {
             return done(null,false,{message: "Wrong Password"})
        }
        return done(null,isUserExist)
            
        } catch (error) {
            console.log(error)
            done(error)
        }
    })
)


passport.use(
    new GoogleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret:envVars.GOOGLE_CLIENT_SECRET,
            callbackURL:envVars.GOOGLE_CALLBACK_URL
        },async (accessToken: string,refreshToken:string,profile:Profile,done:VerifyCallback)=>
        {
            try {
                const email = profile.emails?.[0]?.value;

                if(!email)
                {
                    return done(null,false,{message:"No email found"})
                }

                let user= await User.findOne({email})

                if(!user)
                {
                    user= await User.create({
                        email,
                        name:profile.displayName,
                        picture: profile.photos?.[0]?.value,
                        role:Role.USER,
                        isVerified:true,
                        auths:[
                            {
                                provider: "google",
                                providerId: profile.id
                            }
                        ]
                    })
                }

                return done(null,user,{
                    message: "User create successfully"
                })


            } catch (error) {
                console.log(`Google login Error ${error}`)
                return done(error)
            }
        })
)


passport.serializeUser((user: any, done) => {
  done(null, user._id); // store MongoDB _id in session
});


passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


