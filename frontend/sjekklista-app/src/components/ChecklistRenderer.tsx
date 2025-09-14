import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { ChecklistTemplate, ChecklistTemplateItem } from "@/data/models";

type ChecklistRendererProps = {
  template: ChecklistTemplate;
  //   onSubmit: (values: Record<string, any>) => void;
};

export function ChecklistRenderer({
  template,
}: //   onSubmit,
ChecklistRendererProps) {
  // Flatten state by item id
  const [values, setValues] = useState<Record<string, any>>({});

  const handleChange = (item: ChecklistTemplateItem, value: any) => {
    setValues((prev) => ({
      ...prev,
      [item.id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Template header */}
      <div>
        <h1 className="text-2xl font-bold">{template.name}</h1>
        {template.description && (
          <p className="text-gray-600">{template.description}</p>
        )}
      </div>

      {/* Render each section */}
      {template.items.map((section) => (
        <div
          key={section.id}
          className="border rounded-lg p-4 space-y-4 bg-white shadow-sm"
        >
          <h2 className="text-lg font-semibold">{section.name}</h2>
          {section.description && (
            <p className="text-gray-600">{section.description}</p>
          )}

          {/* Render items in section */}
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.id} className="space-y-1">
                <Label className="flex items-center gap-1">
                  {item.label}
                  {item.required && <span className="text-red-500">*</span>}
                </Label>
                {item.info && (
                  <p className="text-xs text-gray-500">{item.info}</p>
                )}

                {item.type === "textfield" && (
                  <Input
                    value={values[item.id] ?? ""}
                    onChange={(e) => handleChange(item, e.target.value)}
                  />
                )}

                {item.type === "textarea" && (
                  <Textarea
                    value={values[item.id] ?? ""}
                    onChange={(e) => handleChange(item, e.target.value)}
                  />
                )}

                {item.type === "checkbox" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={values[item.id] ?? false}
                      onCheckedChange={(val) => handleChange(item, !!val)}
                    />
                    <span>Ja / Nei</span>
                  </div>
                )}

                {item.type === "date" && (
                  <Input
                    type="date"
                    value={values[item.id] ?? ""}
                    onChange={(e) => handleChange(item, e.target.value)}
                  />
                )}

                {item.type === "number" && (
                  <Input
                    type="number"
                    value={values[item.id] ?? ""}
                    onChange={(e) => handleChange(item, Number(e.target.value))}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Lagre svar
      </button>
    </form>
  );
}
