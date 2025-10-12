import { Router } from "express";
import { checklistRegistrationSchema } from "./contracts/checklist-registration";
import { supabase } from "../../lib/supabase";

const router = Router();

router.get("/checklist-registration", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("checklist_registration")
      .select("*");

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error" });
  }
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
