import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { config } from "..//config";

export const authenticateJWT = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const user = jwt.verify(token, config.secrete);
      if (user) {
        req.user = user;
        next();
        return;
      } else {
        return res.sendStatus(403);
      }
    } catch (e) {
      console.log(e);
      res.status(403);
      res.json({
        error: e,
      });
      return;
    }
  } else {
    res.status(403);
    res.json({
      res: "header not found ",
    });
    return;
  }
};
