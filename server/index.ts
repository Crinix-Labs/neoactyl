import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({ origin: "*"}));
app.use(express.json());
app.use(cookieParser())

app.get('/api/', (req, res) => {
    res.json({ message: "Working", success: true});
})

app.listen(3000, () => console.log("api running successfully on port 3000"));