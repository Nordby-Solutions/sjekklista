import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import checklistRoutes from "./features/checklist/checklist-routes";
import workspaceRoutes from "./features/workspace/workspace-routes";
import { authenticateJWT } from "./middleware/auth";

const sjekklistaApp = express();

sjekklistaApp.use(cors({ origin: true, credentials: true }));
sjekklistaApp.use(cookieParser());
sjekklistaApp.use(express.json());

sjekklistaApp.use("/api", authenticateJWT, workspaceRoutes);
sjekklistaApp.use("/api", authenticateJWT, checklistRoutes);
sjekklistaApp.get("/health", (_, res) => res.send("I'm okay"));

export default sjekklistaApp;
