import "./db";
import "@babel/polyfill";

import dotenv from "dotenv";
import app from "./app";
dotenv.config();
import "./models/Video";
import "./models/comment";
import "./models/User";

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
