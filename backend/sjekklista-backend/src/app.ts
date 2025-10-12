import dotenv from "dotenv";
console.log("NODE_ENV:", process.env.NODE_ENV);
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import checklistRoutes from "./features/checklist-registration/checklist-routes";

const sjekklistaApp = express();

sjekklistaApp.use(cors({ origin: true, credentials: true }));
sjekklistaApp.use(cookieParser());
sjekklistaApp.use(express.json());

sjekklistaApp.use("/api", checklistRoutes);

sjekklistaApp.get("/health", (_, res) => res.send("I'm okay"));

export default sjekklistaApp;
