import express from "express"
import jwt from "jsonwebtoken"
import { authenticatePterodactyl } from "../services/pterodactylApi.ts";

const router = express.Router()

router.post("/login", async (req, res, next) => {
  try {
    const { apiKey } = req.body
    const isAuthenticated = await authenticatePterodactyl(apiKey)

    if (isAuthenticated) {
      const token = jwt.sign({ apiKey }, process.env.JWT_SECRET!, { expiresIn: "1h" })
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
      res.json({ success: true })
    } else {
      res.status(401).json({ success: false, message: "Invalid API key" })
    }
  } catch (error) {
    next(error)
  }
})

router.post("/logout", (req, res) => {
  res.clearCookie("token")
  res.json({ success: true })
})

router.get("/check", (req: Request, res: Response) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ authenticated: false })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    res.json({ authenticated: true })
  } catch (error) {
    res.json({ authenticated: false })
  }
})

export const authRouter = router

