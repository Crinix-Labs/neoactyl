import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRoute from "./apis/auth.ts";
import {sync} from "./models/db.ts";

const app = express();

app.use(cors({ origin: "*"}));
app.use(express.json());
app.use(cookieParser())

app.get('/api/', (req, res) => {
    res.json({ message: "Working", success: true});
})

app.use(authRoute);

sync()

app.listen(3000, () => console.log("api running successfully on port 3000"));