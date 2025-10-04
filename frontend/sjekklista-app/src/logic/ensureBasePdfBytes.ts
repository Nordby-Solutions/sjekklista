import { BLANK_A4_PDF } from "@pdfme/common";
import type { Template } from "@pdfme/common";

/**
 * Ensures that the template's basePdf is a Uint8Array.
 * If it's a URL string, fetches the PDF and converts it.
 * If missing or fetch fails, falls back to BLANK_A4_PDF.
 */
export async function ensureBasePdfBytes(
  template: Template
): Promise<Template> {
  const tpl = { ...template };

  if (typeof tpl.basePdf === "string" && tpl.basePdf.startsWith("/")) {
    try {
      const res = await fetch(tpl.basePdf);
      if (!res.ok) throw new Error(`Failed to fetch basePdf: ${tpl.basePdf}`);
      const ab = await res.arrayBuffer();
      tpl.basePdf = new Uint8Array(ab);
    } catch (err) {
      console.warn("Falling back to BLANK_A4_PDF due to error:", err);
      tpl.basePdf = BLANK_A4_PDF;
    }
  } else if (!tpl.basePdf || !(tpl.basePdf instanceof Uint8Array)) {
    tpl.basePdf = BLANK_A4_PDF;
  }

  return tpl;
}
