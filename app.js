import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localMiddleware } from "./middlewares";

const app = express();

app.set("view engine", "pug");

app.use("/uploads", express.static("uploads"));
app.use(helmet()); // 보안 담당
app.use(cookieParser()); //서버가 쿠키를 이해하도록 한다
app.use(bodyParser.json()); // 서버가 json을 이해
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 html문서를 이해
app.use(morgan("dev")); // logger 의 역할

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
//누군가 나를 부를때 app obj를 주겟다.
