import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import conntectToDb from "./src/database/db.js";
import UserRouter from "./src/routes/User.route.js";
import CaptainRouter from "./src/routes/Captain.route.js";
import cookieParser from "cookie-parser";

const app = express();
// database connection
conntectToDb();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", UserRouter);
app.use("/api", CaptainRouter);

export default app;
