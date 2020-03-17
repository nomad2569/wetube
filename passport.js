import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
//여기서 쿠키에 user id를 담고

passport.deserializeUser(User.deserializeUser());
//쿠키에 있는 user id를 처리함. => id로 user를 찾아냄
