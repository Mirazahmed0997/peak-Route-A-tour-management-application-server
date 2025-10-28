import passport from "passport";
import { envVars } from "./env";
import { User } from "../Modules/User/User.model";
import { Role } from "../Modules/User/User.interface";
import   { Strategy as GoogleStrategy, VerifyCallback,Profile }  from 'passport-google-oauth20';


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


