import { useState } from "react";
import { v4 as uuid } from "uuid";
import type { ChecklistTemplate } from "@/data/models";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChecklistRenderer } from "@/components/ChecklistRenderer";
import { ChecklistTemplateDesignerComponent } from "./ChecklistTemplateDesignerComponent";

// This is your wrapper component
export function ChecklistTemplateDesigner() {
  const [template, setTemplate] = useState<ChecklistTemplate>({
    id: uuid(),
    versionId: uuid(),
    name: "",
    description: "",
    items: [],
  });

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      <h1 className="text-xl font-semibold">Ny sjekkliste</h1>
      <p className="text-gray-600">
        Lag dine egne sjekklister som kan gjenbrukes og deles med teamet. Når en
        sjekkliste tas i bruk, blir malen grunnlaget for registreringen.
      </p>
      <Tabs defaultValue="designer" className="w-full">
        <TabsList>
          <TabsTrigger value="designer">Designer</TabsTrigger>
          <TabsTrigger value="preview">Forhåndsvisning</TabsTrigger>
        </TabsList>

        {/* Designer view */}
        <TabsContent value="designer" className="mt-4">
          <ChecklistTemplateDesignerComponent
            template={template}
            setTemplate={setTemplate}
          />
        </TabsContent>

        {/* Preview view */}
        <TabsContent value="preview" className="mt-4">
          <ChecklistRenderer previewMode={true} template={template} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
