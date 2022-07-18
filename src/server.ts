import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from "./uttils/githubauth";
import userRouter from "../src/routes/user";

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/me", userRouter);

export default server;
