import { API } from "@/data/api";
import { mapChecklistToInputs } from "./mapChecklistToInputs";
import type { Checklist } from "@/data/models";
import { text, line, ellipse, rectangle, checkbox } from "@pdfme/schemas";
import { generate } from "@pdfme/generator";
import { BLANK_A4_PDF } from "@pdfme/common";

export const createPdf = async (checklist: Checklist) => {
  const [template, reports] = await Promise.all([
    API.checklistTempate.findChecklistTemplate(checklist.templateId!),
    API.reportTemplates.getReportTemplates(),
  ]);

  const reportTemplate = reports[0];
  const inputs = [mapChecklistToInputs(template!, checklist)];
  let tpl = reportTemplate.reportObj;

  if (typeof tpl.basePdf === "string" && tpl.basePdf.startsWith("/")) {
    try {
      const res = await fetch(tpl.basePdf);
      if (!res.ok) throw new Error("Failed to fetch basePdf");
      const ab = await res.arrayBuffer();
      tpl.basePdf = new Uint8Array(ab);
    } catch {
      tpl.basePdf = BLANK_A4_PDF;
    }
  } else if (!tpl.basePdf) {
    tpl.basePdf = BLANK_A4_PDF;
  }

  try {
    const pdfUint8Array = await generate({
      template: tpl,
      inputs,
      plugins: { text, line, ellipse, rectangle, checkbox },
    });
    const blob = new Blob([new Uint8Array(pdfUint8Array)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  } catch (err) {
    console.error("PDF preview failed", err);
  }
};
