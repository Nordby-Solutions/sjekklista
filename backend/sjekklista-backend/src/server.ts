import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import checklistRoutes from "./features/checklist-registration/checklist-routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api", checklistRoutes);

app.get("/health", (_, res) => res.send("I'm okay"));

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});
