import express from "express";
import cors from "cors";
import router from "./src/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", router);

const port = process.env.PORT || 10000;
app.listen(port, () => console.log("Server running on port", port));
