// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import { toast } from "sonner";
// import { API } from "@/data/api";
// import type { Checklist, ChecklistTemplate } from "@/data/models";
// import { text, line, ellipse, rectangle, checkbox } from "@pdfme/schemas";
// import { generate } from "@pdfme/generator";
// import { BLANK_A4_PDF } from "@pdfme/common";

// function mapChecklistToInputs(
//   checklistTemplate: ChecklistTemplate,
//   checklist: Checklist
// ): Record<string, string | boolean> {
//   const inputs: Record<string, string | boolean> = {};

//   for (const section of checklistTemplate.items) {
//     for (const item of section.items) {
//       const key = `${section.name}_${item.label}`.replace(/\s+/g, "_");
//       const checklistItem = checklist.items.find(
//         (ci) =>
//           ci.templateSectionId === section.id && ci.templateItemId === item.id
//       );
//       const rawValue = checklistItem?.value;
//       inputs[key] =
//         rawValue === null || rawValue === undefined
//           ? ""
//           : typeof rawValue === "string"
//           ? rawValue
//           : typeof rawValue === "boolean"
//           ? rawValue
//             ? "Ja"
//             : "Nei"
//           : String(rawValue);
//     }
//   }

//   return inputs;
// }

// export default function HistoryPage() {
//   const [checklists, setChecklists] = useState<Checklist[]>([]);
//   const [checklistTemplates, setChecklistTemplates] = useState<
//     { id: string; name: string }[]
//   >([]);
//   const [statusFilter, setStatusFilter] =
//     useState<Checklist["status"]>("in_progress");

//   useEffect(() => {
//     (async () => {
//       const [checklists, checklistTemplates] = await Promise.all([
//         API.checklist.getChecklists(),
//         API.checklistTempate.getChecklistTemplates(),
//       ]);

//       setChecklists(checklists);
//       setChecklistTemplates(
//         checklistTemplates.map((x) => ({ id: x.id, name: x.name }))
//       );
//     })();
//   }, []);

//   const createPdf = async (checklist: Checklist) => {
//     const [checklistTemplate, reports] = await Promise.all([
//       API.checklistTempate.findChecklistTemplate(checklist.templateId!),
//       API.reportTemplates.getReportTemplates(),
//     ]);

//     if (!reports?.length) {
//       toast("Fant ingen rapporter");
//       return;
//     }

//     const reportTemplate = reports[0];
//     const inputs = [mapChecklistToInputs(checklistTemplate!, checklist)];

//     let tpl = reportTemplate.reportObj;
//     if (typeof tpl.basePdf === "string" && tpl.basePdf.startsWith("/")) {
//       try {
//         const res = await fetch(tpl.basePdf);
//         if (!res.ok) throw new Error("Failed to fetch basePdf");
//         const ab = await res.arrayBuffer();
//         tpl.basePdf = new Uint8Array(ab);
//       } catch (err) {
//         console.error("Could not load basePdf, falling back to BLANK_PDF", err);
//         tpl.basePdf = BLANK_A4_PDF;
//       }
//     } else if (!tpl.basePdf) {
//       tpl.basePdf = BLANK_A4_PDF;
//     }

//     try {
//       const pdfUint8Array = await generate({
//         template: tpl,
//         inputs,
//         plugins: { text, line, ellipse, rectangle, checkbox },
//       });

//       const blob = new Blob([new Uint8Array(pdfUint8Array)], {
//         type: "application/pdf",
//       });
//       const url = URL.createObjectURL(blob);
//       window.open(url, "_blank");
//     } catch (err) {
//       console.error("PDF preview failed", err);
//     }
//   };

//   const filtered = checklists.filter((c) => c.status === statusFilter);

//   return (
//     <main className="flex flex-col h-full">
//       {/* Header */}
//       <header className="px-4 pt-6 pb-2 space-y-2">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Tidligere registreringer
//         </h1>
//         <p className="text-sm text-gray-600">
//           Her finner du en oversikt over sjekklister du allerede har fullført
//           eller jobber med.
//         </p>
//       </header>

//       {/* Status Filter Tabs */}
//       <nav
//         className="sticky top-0 z-10 bg-white px-4 py-2 flex gap-2 border-b"
//         aria-label="Statusfilter"
//       >
//         {["in_progress", "completed", "archived"].map((status) => (
//           <Button
//             key={status}
//             variant={statusFilter === status ? "default" : "outline"}
//             onClick={() => setStatusFilter(status)}
//           >
//             {status === "in_progress"
//               ? "Pågående"
//               : status === "completed"
//               ? "Fullført"
//               : "Arkivert"}
//           </Button>
//         ))}
//       </nav>

//       {/* Checklist List */}
//       <section
//         aria-labelledby="checklist-heading"
//         className="flex flex-col gap-2 overflow-y-auto flex-1 p-4"
//       >
//         <h2 id="checklist-heading" className="sr-only">
//           Sjekklister
//         </h2>

//         {filtered.map((checklist) => {
//           const templateName = checklistTemplates.find(
//             (x) => x.id === checklist.templateId
//           )?.name;
//           const isInProgress = checklist.status === "in_progress";
//           const isCompleted = checklist.status === "completed";

//           const card = (
//             <article
//               aria-label={`Sjekkliste ${templateName}`}
//               className="bg-white rounded-lg shadow-md p-4 flex items-center hover:bg-gray-50 transition"
//             >
//               <div className="mr-auto">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {templateName}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   {checklist.createdBy} –{" "}
//                   {new Date(checklist.createdAt).toLocaleDateString()}
//                 </p>
//                 <p className="text-sm text-gray-700 mt-2">
//                   {isInProgress
//                     ? "Fortsett registreringen"
//                     : isCompleted
//                     ? "Fullført – klar for PDF"
//                     : "Arkivert"}
//                 </p>
//               </div>

//               {isCompleted ? (
//                 <Button onClick={() => createPdf(checklist)}>PDF</Button>
//               ) : (
//                 <ArrowRight className="text-gray-500" />
//               )}
//             </article>
//           );

//           return isInProgress ? (
//             <Link
//               key={checklist.id}
//               to={`/checklist/${checklist.id}`}
//               role="link"
//               aria-label={`Åpne sjekkliste ${templateName}`}
//               className="block"
//             >
//               {card}
//             </Link>
//           ) : (
//             <div key={checklist.id}>{card}</div>
//           );
//         })}
//       </section>
//     </main>
//   );
// }
