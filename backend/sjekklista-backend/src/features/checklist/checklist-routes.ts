import { Router } from "express";
import {
  checklistRegistrationSchema,
  checklistTemplateSchema,
  mapToChecklistTemplateDtoToPersistenceModel,
  ChecklistTemplatePersistenceModel,
  mapToChecklistTemplatePersistenceModelToDto,
} from "./contracts";
import { supabase } from "../../lib/supabase";

const router = Router();

/**
 * Checklist Template Routes
 */
router.get("/checklist-template", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("checklist_template")
      .select("*");

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    const checklistTemplates = data as ChecklistTemplatePersistenceModel[];
    const checklistTemplatesDto = checklistTemplates.map(
      mapToChecklistTemplatePersistenceModelToDto
    );
    console.debug(
      "Fetched checklist templates:",
      checklistTemplates,
      checklistTemplatesDto
    );

    res.json(checklistTemplatesDto);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error" });
  }
});

router.post("/checklist-template", async (req, res) => {
  console.log("Received checklist template:", req.body);

  const parseResult = checklistTemplateSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error });
  }

  try {
    const persistenceModel = mapToChecklistTemplateDtoToPersistenceModel(
      parseResult.data
    );
    const { data, error } = await supabase
      .from("checklist_template")
      .insert(persistenceModel)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error" });
  }
});

/**
 * Checklist Registration Routes
 */

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
