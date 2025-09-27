import { useEffect, useRef, useState } from "react";
import { Designer } from "@pdfme/ui";
import { generate } from "@pdfme/generator";
import type { Template, Schema } from "@pdfme/common";
import { API } from "@/data/api";
import type { ChecklistTemplate } from "@/data/models";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { text } from "@pdfme/schemas";
import { useAutoCollapseSidebarForWidePage } from "@/hooks/useAutoCollapseSidebarForWidePage";
import { BLANK_A4_PDF } from "@pdfme/common";

export default function ReportDesignerPage() {
  useAutoCollapseSidebarForWidePage();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const designerRef = useRef<Designer | null>(null);
  const templateRef = useRef<Template | null>(null);

  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [isDesignerReady, setIsDesignerReady] = useState(false);

  // Load checklist templates once
  useEffect(() => {
    let mounted = true;
    (async () => {
      const result = await API.checklistTempate.getChecklistTemplates();
      if (mounted) setTemplates(result);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Build template object for a checklist
  const buildEmptyTemplateForChecklist = (): Template => {
    return {
      basePdf: "/blank.pdf",
      schemas: [[]],
    };
  };

  // Initialize pdfme Designer exactly once (no re-init on template changes)
  useEffect(() => {
    if (!containerRef.current) return;

    const initialTemplate = buildEmptyTemplateForChecklist();
    templateRef.current = initialTemplate;

    const designer = new Designer({
      domContainer: containerRef.current,
      template: initialTemplate,
      plugins: { text },
      options: {
        sidebarOpen: true,
        lang: "en", // base language (keeps internal defaults)
        labels: {
          // keys come from pdfme i18n; override with Norwegian
          fieldsList: "Feltliste",
          addField: "Legg til felt",
          preview: "Forhåndsvis",

          // add more keys as needed (refer to pdfme i18n.ts for full list)
        },
      },
    });

    // Keep templateRef in sync, but avoid calling setState that re-inits Designer
    designer.onChangeTemplate((updated) => {
      templateRef.current = updated;
    });

    designerRef.current = designer;
    setIsDesignerReady(true);

    return () => {
      designer.destroy();
      designerRef.current = null;
      templateRef.current = null;
      setIsDesignerReady(false);
    };
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When user selects a checklist, update the Designer template (no re-init)
  useEffect(() => {
    if (!selectedTemplateId) return;
    const checklist = templates.find((t) => t.id === selectedTemplateId);
    if (!checklist) return;

    const newTemplate = buildEmptyTemplateForChecklist();

    // If you want to predefine fieldTypes or any other options, do it here.
    // Keep templateRef in sync and push to designer via updateTemplate.
    templateRef.current = newTemplate;

    if (designerRef.current) {
      designerRef.current.updateTemplate(newTemplate);
      // If you need to toggle UI state instead of re-rendering, use updateOptions
      // designerRef.current.updateOptions({ sidebarOpen: true });
    }
  }, [selectedTemplateId, templates]);

  // Programmatically add a field to the Designer without recreating it
  const addField = (label: string) => {
    const designer = designerRef.current;
    if (!designer) return;

    const current = designer.getTemplate();
    const page0 = current.schemas[0] ?? [];

    const newField: Schema = {
      name: label,
      type: "text",
      content: label,
      position: { x: 50, y: 50 + page0.length * 30 },
      width: 50,
      height: 5,
      rotate: 0,
      opacity: 1,
      readOnly: false,
      required: false,
    };

    const next: Template = {
      ...current,
      schemas: [[...page0, newField]],
    };

    // updateTemplate updates the designer in-place without re-creating it
    designer.updateTemplate(next);
    // keep templateRef synced
    templateRef.current = next;
  };

  // Export PDF preview using current template from the Designer
  const handlePreview = async () => {
    // get the current template from your designerRef/templateRef
    const current = templateRef.current ?? designerRef.current?.getTemplate();
    if (!current) return;

    // ensure basePdf is actual bytes
    let tpl = { ...current };
    if (typeof tpl.basePdf === "string" && tpl.basePdf.startsWith("/")) {
      try {
        const res = await fetch(tpl.basePdf);
        if (!res.ok) throw new Error("Failed to fetch basePdf");
        const ab = await res.arrayBuffer();
        tpl.basePdf = new Uint8Array(ab);
      } catch (err) {
        console.error("Could not load basePdf, falling back to BLANK_PDF", err);
        tpl.basePdf = BLANK_A4_PDF;
      }
    } else if (!tpl.basePdf) {
      tpl.basePdf = BLANK_A4_PDF;
    }

    try {
      const pdfUint8Array = await generate({
        template: tpl,
        inputs: [{}],
        plugins: { text }, // include any other plugins used in the template
      });

      const blob = new Blob([new Uint8Array(pdfUint8Array)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      // optional: URL.revokeObjectURL(url) after some timeout
    } catch (err) {
      console.error("PDF preview failed", err);
    }
  };
  return (
    <div className="flex h-screen">
      <aside className="w-72 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-sm font-medium mb-2">Velg sjekklistemal</h2>
          <Select
            value={selectedTemplateId ?? ""}
            onValueChange={(val) => setSelectedTemplateId(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Velg en mal…" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="flex-1 p-4">
          <h3 className="text-sm font-semibold mb-2">Tilgjengelige felt</h3>
          {selectedTemplateId ? (
            <>
              {templates
                .find((t) => t.id === selectedTemplateId)
                ?.items.map((section) => (
                  <div key={section.name} className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {section.name}
                    </p>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <Button
                          key={item.label}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() =>
                            addField(`${section.name}_${item.label}`)
                          }
                        >
                          + {item.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              Velg en mal for å se felter
            </p>
          )}
        </ScrollArea>

        <Separator />
        <div className="p-4">
          <Button
            className="w-full"
            onClick={handlePreview}
            disabled={!isDesignerReady}
          >
            Forhåndsvis PDF
          </Button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-50 p-4">
        <div
          ref={containerRef}
          className="border rounded bg-white shadow-sm w-full h-full"
        />
      </main>
    </div>
  );
}
