
import express from "express";
import jwt from "jsonwebtoken";
import account from "../models/accounts.ts";
import setting from "../models/settings.ts";
import bcrypt from "bcrypt"

const sect = setting.findOne({ where: {
    setting: "security"
} });

const router: any = express.Router();

router.post("/api/auth/regs", (req, res) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password ) {
    res.json({ message: "All feild are required", success: false });
  }

  const hashedPass: string = bcrypt.hash(password)

});

router.get("/api/auth/login", (req: any, res: any) => {
  const { username, email, password } = req.body;
  if (!username && !email) {
    res.json({ error: "no username or email provided", success: false });
  }
});

export default router;
