import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import toml from "toml";
import fetchEggs from "./controller/fetchEggs.ts"

// config 
const config = toml.parse(fs.readFileSync("./config.toml", "utf-8"));

// Router import
import loginRoute from "./api/login.ts";
import registerRoute from "./api/register.ts";
import createServerRoute from "./api/createServer.ts";
import deleteServerRoute from "./api/deleteServer.ts"

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

app.get('/api/check-auth', (req, res) => {
  const authCookie = req.cookies.authToken; // Adjust based on your auth cookie name
  res.json({ authenticated: !!authCookie });
});

app.use(loginRoute);
app.use(registerRoute);
app.use(createServerRoute);
app.use(deleteServerRoute);

app.listen(config.domain.port, () => console.log(`Dashboard Running in port ${config.domain.port}`));

fetchEggs();