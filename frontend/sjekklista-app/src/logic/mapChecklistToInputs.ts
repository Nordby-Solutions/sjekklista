import type { Checklist, ChecklistTemplate } from "@/data/models";

export function mapChecklistToInputs(
  template: ChecklistTemplate,
  checklist: Checklist
) {
  const inputs: Record<string, string | boolean> = {};
  for (const section of template.items) {
    for (const item of section.items) {
      const key = `${section.name}_${item.label}`.replace(/\s+/g, "_");
      const checklistItem = checklist.items.find(
        (ci) =>
          ci.templateSectionId === section.id && ci.templateItemId === item.id
      );
      const rawValue = checklistItem?.value;
      inputs[key] =
        rawValue === null || rawValue === undefined
          ? ""
          : typeof rawValue === "string"
          ? rawValue
          : typeof rawValue === "boolean"
          ? rawValue
            ? "Ja"
            : "Nei"
          : String(rawValue);
    }
  }
  return inputs;
}
