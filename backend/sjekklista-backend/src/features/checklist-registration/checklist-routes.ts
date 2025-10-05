import { Router } from "express";
import { checklistRegistrationSchema } from "./contracts/checklist-registration";

const router = Router();

router.get("/checklist-registration", (req, res) => {
  res.json([{ name: "Cool" }]);
});

router.post("/checklist-registration", (req, res) => {
  const result = checklistRegistrationSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  console.log("REQ:", JSON.stringify(result.data));
  res.json(result.data);
});

export default router;
