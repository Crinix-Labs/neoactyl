import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import toml from "toml";

// config 
const config = toml.parse(fs.readFileSync("./config.toml", "utf-8"));

// Router import
import loginRoute from "./api/login.ts";
import registerRoute from "./api/register.ts";

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
app.use(loginRoute);
app.use(registerRoute);

app.listen(config.domain.port, () => console.log(`Dashboard Running in port ${config.domain.port}`));
