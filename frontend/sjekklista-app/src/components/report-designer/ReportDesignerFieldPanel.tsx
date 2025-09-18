import type { ChecklistField, TextBlockDescriptor } from "./types";

export type ReportDesignerFieldPanelProps = {
  fields: ChecklistField[];
  onAddField: (field: ChecklistField | TextBlockDescriptor) => void;
};

const textStyles: TextBlockDescriptor[] = [
  { label: "Overskrift 1", style: "h1", type: "text" },
  { label: "Overskrift 2", style: "h2", type: "text" },
  { label: "Overskrift 3", style: "h3", type: "text" },
  { label: "Standard felt", style: "body", type: "text" },
];

export function ReportDesignerFieldPanel({
  fields,
}: // onAddField,
ReportDesignerFieldPanelProps) {
  return (
    <div className="p-4 border-r w-64 bg-white space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Tilgjengelige felt</h3>
        <ul className="space-y-2">
          {fields.map((field) => (
            <div
              key={field.id}
              draggable
              onDragStart={
                (e) => e.dataTransfer.setData("field", JSON.stringify(field)) // ✅ fixed
              }
              className="p-2 bg-slate-100 rounded cursor-grab hover:bg-slate-200"
            >
              <div className="text-sm font-medium">{field.label}</div>
              <div className="text-xs text-gray-500">{field.sectionName}</div>
            </div>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Tekstblokker</h3>
        <ul className="space-y-2">
          {textStyles.map(({ label, style }) => (
            <div
              key={style}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData(
                  "field",
                  JSON.stringify({ type: "text", label, style })
                )
              }
              className="p-2 bg-slate-100 rounded cursor-grab hover:bg-slate-200"
            >
              <div className="text-sm font-medium">{label}</div>
              <div className="text-xs text-gray-500">Tekststil: {style}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
