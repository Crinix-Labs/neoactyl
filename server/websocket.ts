import type WebSocket from "ws"
import jwt from "jsonwebtoken"

export function setupWebSocket(wss: WebSocket.Server) {
  wss.on("connection", (ws: WebSocket, req: any) => {
    const token = req.url.split("token=")[1]

    if (!token) {
      ws.close(1008, "Unauthorized")
      return
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { apiKey: string }

      // Here you would set up the connection to the Pterodactyl websocket
      // and relay messages to the client

      ws.on("message", (message: string) => {
        console.log("Received message:", message)
        // Handle incoming messages from the client
      })

      ws.on("close", () => {
        console.log("WebSocket connection closed")
        // Clean up any resources
      })
    } catch (error) {
      ws.close(1008, "Invalid token")
    }
  })
}

