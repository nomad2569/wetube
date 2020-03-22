import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStroe from "connect-mongo";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import { localMiddleware } from "./middlewares";

import "./passport";

const app = express();

const CokieStore = MongoStroe(session);

app.set("view engine", "pug");

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(helmet()); // 보안 담당
app.use(cookieParser()); //서버가 쿠키를 이해하도록 한다
app.use(bodyParser.json()); // 서버가 json을 이해
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 html문서를 이해
app.use(morgan("dev")); // logger 의 역할
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);
app.use(routes.home, globalRouter);

app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
//누군가 나를 부를때 app obj를 주겟다.
