import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import authRouter from "./uttils/githubauth";
import { authenticateJWT } from "./middleware/jwt";

const app = express();

const server = http.createServer(app);

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.get("/api/me", authenticateJWT, (req: Request, res: Response) => {
  try {
  } catch (e) {
    console.log(e);
  }
});

export default server;
