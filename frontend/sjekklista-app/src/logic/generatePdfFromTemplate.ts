import { generate } from "@pdfme/generator";
import { text, line, ellipse, rectangle, checkbox } from "@pdfme/schemas";
import { BLANK_A4_PDF } from "@pdfme/common";
import type { Template } from "@pdfme/common";

/**
 * Generates a PDF from a template and input data.
 * @param template - A pdfme Template object with basePdf and schemas
 * @param inputs - An array of input objects mapping field names to values
 * @returns Uint8Array of the generated PDF
 */
export async function generatePdfFromTemplate(
  template: Template,
  inputs: Record<string, string | boolean>[]
): Promise<Uint8Array> {
  const tpl = { ...template };

  // Ensure basePdf is a Uint8Array
  if (typeof tpl.basePdf === "string" && tpl.basePdf.startsWith("/")) {
    try {
      const res = await fetch(tpl.basePdf);
      if (!res.ok) throw new Error("Failed to fetch basePdf");
      const ab = await res.arrayBuffer();
      tpl.basePdf = new Uint8Array(ab);
    } catch (err) {
      console.warn("Falling back to BLANK_A4_PDF:", err);
      tpl.basePdf = BLANK_A4_PDF;
    }
  } else if (!tpl.basePdf || !(tpl.basePdf instanceof Uint8Array)) {
    tpl.basePdf = BLANK_A4_PDF;
  }

  // Call generate with plugins matching your template
  const pdfUint8Array = await generate({
    template: tpl,
    inputs,
    plugins: {
      text,
      line,
      ellipse,
      rectangle,
      checkbox,
      // Add any custom plugins here
    },
  });

  return pdfUint8Array;
}
