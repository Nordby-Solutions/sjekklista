import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import checklistRoutes from "./features/checklist-registration/checklist-routes";

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api", checklistRoutes);

app.get("/health", (_, res) => res.send("I'm okay"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
