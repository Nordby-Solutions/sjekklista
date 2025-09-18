import { ReportDesignerCanvas } from "@/components/report-designer/ReportDesignerCanvas";
import type {
  ChecklistField,
  ReportBlock,
} from "@/components/report-designer/types";
import { ReportDesignerFieldPanel } from "@/components/report-designer/ReportDesignerFieldPanel";
import { API } from "@/data/api";
import type { ChecklistTemplate } from "@/data/models";
import { useEffect, useState } from "react";

export default function ReportDesignerPage() {
  const [layout, setLayout] = useState<ReportBlock[]>([]);
  const [checklistFields, setChecklistFields] = useState<ChecklistField[]>([]);
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const result = await API.checklistTempate.getChecklistTemplates();
      setTemplates(result);
    })();
  }, []);

  useEffect(() => {
    if (!selectedTemplateId) return;

    const template = templates.find((t) => t.id === selectedTemplateId);
    if (!template) return;

    const fields: ChecklistField[] = template.items.flatMap((section) =>
      section.items.map((item) => ({
        id: item.id,
        label: item.label,
        sectionName: section.name,
        type: item.type,
      }))
    );

    setChecklistFields(fields);
    setLayout([]); // reset layout when switching template
  }, [selectedTemplateId, templates]);

  return (
    <div className="flex flex-col h-full">
      {/* Template selector */}
      <div className="p-4 border-b bg-white">
        <label className="block text-sm font-medium mb-1">
          Velg sjekklistemal
        </label>
        <select
          value={selectedTemplateId ?? ""}
          onChange={(e) => setSelectedTemplateId(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="" disabled>
            Velg en mal…
          </option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {/* Designer layout */}
      <div className="flex h-full">
        <ReportDesignerFieldPanel
          fields={checklistFields}
          onAddField={(fieldOrText) => {
            const isTextBlock = !("sectionName" in fieldOrText); // ✅ this works reliably

            const newBlock: ReportBlock = isTextBlock
              ? {
                  id: crypto.randomUUID(),
                  type: "text",
                  label: "",
                  style: fieldOrText.style,
                  x: 40,
                  y: 40,
                  width: 300,
                  height: 50,
                }
              : {
                  id: crypto.randomUUID(),
                  type: "field",
                  label: fieldOrText.label,
                  fieldKey: fieldOrText.id,
                  x: 40,
                  y: 40,
                  width: 200,
                  height: 60,
                };

            setLayout((prev) => [...prev, newBlock]);
          }}
        />
        <div className="flex flex-col flex-1 p-4 space-y-4">
          <ReportDesignerCanvas layout={layout} setLayout={setLayout} />
        </div>
      </div>
    </div>
  );
}
