import toml from "toml";
import express from "express";
import fs from "node:fs";
import cors from "cors";

const tomlfl = fs.readFileSync("./config.toml", "utf-8");
const config: any = toml.parse(tomlfl);

const app = express();
app.use(cors());
app.use(express.json())

app.post("/", (req: any, res: any) => {
    res.json({ status: "running", success: true});
});

app.get("/config/", (req: any, res: any) => {
    res.json({ config, success: true});
});

app.listen(config.general.port, "0.0.0.0", () => console.log("backbone started"))