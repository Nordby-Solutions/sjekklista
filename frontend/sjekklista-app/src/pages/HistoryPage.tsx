import { Button } from "@/components/ui/button";
import { API } from "@/data/api";
import type { Checklist, ChecklistTemplate } from "@/data/models";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { text, line, ellipse, rectangle, checkbox } from "@pdfme/schemas";
import { generate } from "@pdfme/generator";
import { BLANK_A4_PDF } from "@pdfme/common";

function mapChecklistToInputs(
  checklistTemplate: ChecklistTemplate,
  checklist: Checklist
): Record<string, string | boolean> {
  const inputs: Record<string, string | boolean> = {};

  console.log("mapChecklistToInputs: ", {
    checklistTemplate,
    checklist,
  });

  for (const section of checklistTemplate.items) {
    for (const item of section.items) {
      const key = `${section.name}_${item.label}`.replace(/\s+/g, "_");

      const checklistItem = checklist.items.find(
        (ci) =>
          ci.templateSectionId === section.id && ci.templateItemId === item.id
      );

      console.log("CHECKLISTITEM: ", checklistItem);

      inputs[key] = checklistItem?.value ?? "";
    }
  }

  return inputs;
}

export default function HistoryPage() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [filteredChecklists, __] = useState<Checklist[]>([]);
  const [checklistTemplates, setChecklistTemplates] = useState<
    { id: string; name: string }[]
  >([]);
  const [search, _] = useState("");

  useEffect(() => {
    (async () => {
      const [checklists, checklistTemplates] = await Promise.all([
        API.checklist.getChecklists(),
        API.checklistTempate.getChecklistTemplates(),
      ]);

      const templateDict = checklistTemplates.map((x) => ({
        id: x.id,
        name: x.name,
      }));

      setChecklists(checklists);
      setChecklistTemplates(templateDict);
    })();
  }, []);

  const createPdf = async (checklist: Checklist) => {
    const [checklistTemplate, reports] = await Promise.all([
      await API.checklistTempate.findChecklistTemplate(checklist.templateId!),
      await API.reportTemplates.getReportTemplates(),
    ]);

    if (reports?.length == 0) {
      toast("Fant ingen rapporter");
    }

    console.log("Reports: ", { reports });

    const reportTemplate = reports[0];
    const inputs = [mapChecklistToInputs(checklistTemplate!, checklist)];

    // ensure basePdf is actual bytes
    let tpl = reportTemplate.reportObj;
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

    console.log("Before generate: ", { inputs });

    try {
      const pdfUint8Array = await generate({
        template: tpl,
        inputs: inputs,
        plugins: { text, line, ellipse, rectangle, checkbox }, // include any other plugins used in the template
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
    <div>
      <div className="px-4 pt-6 pb-2 space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Tidligere registreringer
        </h1>
        <p className="text-sm text-gray-600">
          Her finner du en oversikt over sjekklister du allerede har fullført.
        </p>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto flex-1 h-full p-2">
        {/* Checklist cards */}
        {(search.length == 0 ? checklists : filteredChecklists).map(
          (currChecklist) => (
            <div
              key={currChecklist.id}
              className="bg-white rounded-lg shadow-md p-4 flex"
            >
              <div className="mr-auto">
                <h2 className="text-lg font-semibold text-gray-900">
                  Status: {currChecklist.status}
                </h2>
                <h2 className="text-lg font-semibold text-gray-900">
                  Mal:{" "}
                  {
                    checklistTemplates?.find(
                      (x) => x.id == currChecklist.templateId
                    )?.name
                  }
                </h2>
                <h2 className="text-lg font-semibold text-gray-900">
                  {currChecklist.createdBy} - {currChecklist.createdAt}
                </h2>
                <p className="text-gray-700 mt-2">
                  Åpne denne sjekklisten for å fortsette eller gjøre endringer.
                </p>
              </div>
              <ArrowRight />

              <Button onClick={() => createPdf(currChecklist)}>
                Skriv ut PDF
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
