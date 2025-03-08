import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import toml from "toml";
import fetchEggs from "./controller/fetchEggs.ts";
import fetchNodes from "./controller/fetchNodes.ts";
import db from "./models/db.ts";

// config
const config = toml.parse(fs.readFileSync("./config.toml", "utf-8"));

// Router import
import loginRoute from "./api/login.ts";
import registerRoute from "./api/register.ts";
import createServerRoute from "./api/createServer.ts";
import deleteServerRoute from "./api/deleteServer.ts";
import configRoute from "./api/config.ts";
import renewRoute from "./api/renew.ts"; // Import the renew route
import eggsRoute from "./api/eggs.ts";
import discord from "./api/discord.ts";
import nodeRoute from "./api/nodes.ts";
import serverRoute from "./api/server.ts";
import meRoute from "./api/meRoute.ts";

// app
const app = Express();

app.use(bodyParser());
app.use(cors("*"));
app.use(Express.json());
app.use(cookieParser());

// Router define

app.get("/api/", (req, res) => {
  res.json({ status: "running", success: true });
});

app.get("/api/check-auth", (req, res) => {
  const authCookie = req.cookies.authToken; // Adjust based on your auth cookie name
  res.json({ authenticated: !!authCookie });
});

app.use(loginRoute);
app.use(registerRoute);
app.use(createServerRoute);
app.use(deleteServerRoute);
app.use(configRoute);
app.use(renewRoute); // Use the renew route
app.use(eggsRoute);
app.use(discord);
app.use(nodeRoute);
app.use(serverRoute);
app.use(meRoute);

app.listen(config.domain.port, () =>
  console.log(`Dashboard Running in port ${config.domain.port}`)
);

(async () => {
  await db.sync({ alter: true }); // Ensure tables are created
  console.log("Database synced!");
})();

fetchEggs();
fetchNodes();
