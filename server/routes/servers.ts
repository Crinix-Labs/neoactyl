import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import { getServers, getServerDetails, powerServer } from "../services/pterodactylApi.ts";

const router = express.Router()

router.use(authMiddleware)

router.get("/", async (req, res, next) => {
  try {
    const servers = await getServers(req.user.apiKey)
    res.json(servers)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const serverDetails = await getServerDetails(req.user.apiKey, req.params.id)
    res.json(serverDetails)
  } catch (error) {
    next(error)
  }
})

router.post("/:id/power", async (req, res, next) => {
  try {
    const { action } = req.body
    await powerServer(req.user.apiKey, req.params.id, action)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

export const serverRouter = router

