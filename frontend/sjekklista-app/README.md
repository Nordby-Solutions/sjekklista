# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

import { useEffect, useRef, useState } from "react"; import { Designer } from "@pdfme/ui"; import { generate } from "@pdfme/generator"; import type { Template, Schema } from "@pdfme/common"; import { API } from "@/data/api"; import type { ChecklistTemplate } from "@/data/models"; import { Button } from "@/components/ui/button"; const buildTemplate = (checklist: ChecklistTemplate): Template => { const pageSchemas: Schema[] = []; checklist.items.forEach((section, sectionIndex) => { section.items.forEach((item, itemIndex) => { pageSchemas.push({ name: `${section.name}_${item.label}`, type: "text", content: item.label ?? "Error", position: { x: 50 + (itemIndex % 2) _ 300, y: 50 + sectionIndex _ 100 + itemIndex _ 30, }, width: 280, height: 20, rotate: 0, opacity: 1, readOnly: true, required: false, }); }); }); return { basePdf: "/blank.pdf", // optional: base64 or URL schemas: [pageSchemas], // ✅ wrapped in array for single page }; }; export default function ReportDesignerPage() { const designerRef = useRef<HTMLDivElement>(null); const [templates, setTemplates] = useState<ChecklistTemplate[]>([]); const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>( null ); const [template, setTemplate] = useState<Template | null>(null); // Load checklist templates useEffect(() => { (async () => { const result = await API.checklistTempate.getChecklistTemplates(); setTemplates(result); })(); }, []); // Convert selected checklist to pdfme template useEffect(() => { if (!selectedTemplateId) return; const checklist = templates.find((t) => t.id === selectedTemplateId); if (!checklist) return; const newTemplate = buildTemplate(checklist); setTemplate(newTemplate); }, [selectedTemplateId, templates]); // Initialize pdfme designer useEffect(() => { if (!template || !designerRef.current) return; const designer = new Designer({ domContainer: designerRef.current, template, options: { font: { Helvetica: { data: "Helvetica", // or base64, ArrayBuffer, Uint8Array fallback: true, subset: false, }, }, }, }); designer.onChangeTemplate((updatedTemplate) => { setTemplate(updatedTemplate); }); }, [template]); // Export PDF preview const handlePreview = async () => { if (!template) return; const pdfUint8Array = await generate({ template, inputs: [{}] }); const blob = new Blob([new Uint8Array(pdfUint8Array)], { type: "application/pdf", }); const url = URL.createObjectURL(blob); window.open(url, "\_blank"); }; return ( <div className="flex flex-col h-full"> {/_ Template selector _/} <div className="p-4 border-b bg-white"> <label className="block text-sm font-medium mb-1"> Velg sjekklistemal </label> <select value={selectedTemplateId ?? ""} onChange={(e) => setSelectedTemplateId(e.target.value)} className="border rounded px-3 py-2 w-full" > <option value="" disabled> Velg en mal… </option> {templates.map((template) => ( <option key={template.id} value={template.id}> {template.name} </option> ))} </select> </div> {/_ Designer canvas _/} <div className="flex-1 overflow-auto p-4 bg-gray-50"> <div ref={designerRef} className="border rounded bg-white shadow-sm" /> </div> {/_ Actions \*/} <div className="p-4 border-t bg-white flex justify-end"> <Button onClick={handlePreview}>Forhåndsvis PDF</Button> </div> </div> ); }
