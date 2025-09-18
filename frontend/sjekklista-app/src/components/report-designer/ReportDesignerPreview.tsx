// export function ReportDesignerPreview({ layout }: { layout: string[] }) {
//   const mockData = {
//     hasGrounding: true,
//     voltageReading: 230,
//     notes: "Alt ser bra ut",
//   };

//   return (
//     <div className="p-4 border bg-white rounded">
//       <h3 className="font-semibold mb-2">Forhåndsvisning</h3>
//       <ul className="space-y-2">
//         {layout.map((field) => (
//           <div key={field} className="p-2 border rounded bg-slate-50">
//             <strong>{field}:</strong>{" "}
//             {mockData[field as keyof typeof mockData]?.toString() ?? "—"}
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// }
