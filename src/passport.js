import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/user";
import routes from "./routes";
import { githubLoginCallback } from "./controller/userController";

passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
//여기서 쿠키에 user id를 담고

passport.deserializeUser(User.deserializeUser());
//쿠키에 있는 user id를 처리함. => id로 user를 찾아냄
