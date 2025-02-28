import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Router import
import loginRoute from "./api/login.ts";

// app
const app = Express();

app.use(bodyParser());
app.use(cors("*"));
app.use(Express.json());

// Router define

app.get("/", (req, res) => {
  res.json({ status: "running", success: true });
});
app.use(loginRoute);

app.listen(4002);
