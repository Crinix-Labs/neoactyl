import express from "express"
import http from "http"
import WebSocket from "ws"
import dotenv from "dotenv"
import cors from "cors"
import { authRouter } from "./routes/auth.ts"
import { serverRouter } from "./routes/servers.ts"
import { errorHandler } from "./middleware/errorHandler.ts"
import { setupWebSocket } from "./websocket.ts"

dotenv.config()

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRouter)
app.use("/api/servers", serverRouter)

// WebSocket setup
setupWebSocket(wss)

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

