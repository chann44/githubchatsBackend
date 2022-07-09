import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { get } from "lodash";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import authRouter from "../authentication/githubauth";

const secret = "sssss";
const COOKIE_NAME = "github-jwt";
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhsot:3000",
  },
});

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

io.on("connection", (socket) => {
  console.log("cleint connected : ", socket.id);
  socket.join("clock-room");
  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});
app.get("/api/me", (req: Request, res: Response) => {
  const cookie = get(req, `cookies[${COOKIE_NAME}]`);

  try {
    const decode = jwt.verify(cookie, secret);
    console.log(decode);
    res.json(decode);
  } catch (e) {
    console.log(e);
  }
});

setInterval(() => {
  io.to("clock-room").emit("‘time’", new Date());
}, 1000);
export default server;
