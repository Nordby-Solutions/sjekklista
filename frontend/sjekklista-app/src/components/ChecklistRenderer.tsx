import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type {
  Checklist,
  ChecklistTemplate,
  ChecklistTemplateItem,
} from "@/data/models";
import { API } from "@/data/api";
import { toast } from "sonner";
import SignatureCanvas from "react-signature-canvas";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

type ChecklistRendererProps = {
  template: ChecklistTemplate;
  previewMode: boolean;

  //   onSubmit: (values: Record<string, any>) => void;
};

export function ChecklistRenderer({
  template,
  previewMode = false,
}: //   onSubmit,
ChecklistRendererProps) {
  // Flatten state by item id
  const [values, setValues] = useState<Record<string, any>>({});
  const { t } = useTranslation();
  const sigRefs = useRef<Record<string, SignatureCanvas>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(300);
  const navigate = useNavigate();

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        setCanvasWidth(containerRef.current.offsetWidth);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleChange = (item: ChecklistTemplateItem, value: any) => {
    setValues((prev) => ({
      ...prev,
      [item.id]: value,
    }));
  };

  const handleSave = async (
    status: "draft" | "not_started" | "in_progress" | "completed"
  ) => {
    const now = new Date().toISOString();
    const checklist: Checklist = {
      id: crypto.randomUUID(),
      templateId: template.id,
      templateVersionId: template.versionId,
      status: status,
      assignedTo: null,
      dueDate: null,
      createdAt: now,
      updatedAt: now,
      createdBy: "currentUserId", // replace with auth context
      updatedBy: "currentUserId",
      items: template.items.flatMap((section) =>
        section.items.map((item) => ({
          id: crypto.randomUUID(),
          templateItemId: item.id,
          templateSectionId: section.id,
          value: values[item.id] ?? null,
          completedAt: values[item.id] ? now : null,
          completedBy: values[item.id] ? "currentUserId" : null,
        }))
      ),
    };

    await API.checklist.saveChecklist(checklist);
    await toast.success(t("checklist.saved", "Sjekklista lagret"), {
      position: "top-center",
    });

    navigate("/");
  };

  return (
    <form className="space-y-6">
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
                    <span>{t("checklist.yesNo", "Ja / Nei")}</span>
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

                {item.type === "signature" && (
                  <div ref={containerRef}>
                    <SignatureCanvas
                      ref={(ref) => {
                        if (ref) sigRefs.current[item.id] = ref;
                      }}
                      penColor="black"
                      canvasProps={{
                        width: canvasWidth,
                        height: 200,
                        className: "border", // 👈 full width via Tailwind
                      }}
                      onEnd={() => {
                        const dataURL = sigRefs.current[item.id]
                          ?.getTrimmedCanvas()
                          .toDataURL("image/png");
                        handleChange(item, dataURL);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        sigRefs.current[item.id]?.clear();
                        handleChange(item, ""); // Clear value
                      }}
                      className="mt-2 text-sm text-red-600"
                    >
                      {t("checklist.removeSignature", "Fjern signatur")}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {previewMode ? (
        ""
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-brand-purple text-white">
              {t("checklist.saveAnswers", "Lagre svar")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="py-4 text-base"
              onClick={() => handleSave("completed")}
            >
              ✅ {t("checklist.saveAsCompleted", "Lagre som fullført")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="py-4 text-base"
              onClick={() => handleSave("draft")}
            >
              📝 {t("checklist.saveAsDraft", "Lagre som kladd")}
            </DropdownMenuItem>
            <DropdownMenuItem className="py-4 text-base">
              ❌ {t("checklist.cancel", "Avbryt")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </form>
  );
}
