import express from  "express";
import jwt from "jsonwebtoken";
import account from "../models/accounts.ts";

const router: any = express.router();

router.post("/api/auth/regs", (req: any, res: any) => {
     const { username, email, password } = req.body;
});

router.get("/api/auth/login", (req: any, res: any) => {
    const { username, email, password } = req.body;
    if(!username && !email) {
        res.json({ error: "no username or email provided", success: false});
    }
})