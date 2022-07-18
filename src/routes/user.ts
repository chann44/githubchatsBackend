import { Router } from "express";
import { Response } from "express";
import { authenticateJWT } from "../middleware/jwt";

const router = Router();

router.get("/", authenticateJWT, (req: any, res: Response) => {
  const user = req.user;
  console.log(user);
  console.log(user);
  res.json({
    user,
  });
});

export default router;
