import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";
//default로 export 하지 않았기 때문에 {}해줘

const app = express();
const PORT = 4000;

const handleHome = (request, response) => {
  response.send("Hello from home");
};

const handleProfile = (req, res) => {
  res.send("You are on my profile");
};

app.use(cookieParser()); //서버가 쿠키를 이해하도록 한다
app.use(bodyParser.json()); // 서버가 json을 이해
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 html문서를 이해
app.use(morgan("dev")); // logger 의 역할
app.use(helmet()); // 보안 담당 표면적인 역할 ㄴ

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter);

export default app;
//누군가 나를 부를때 app obj를 주겟다.
