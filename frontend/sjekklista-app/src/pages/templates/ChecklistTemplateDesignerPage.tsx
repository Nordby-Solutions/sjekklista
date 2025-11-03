import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import type { ChecklistTemplate } from "@/data/models";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChecklistRenderer } from "@/components/ChecklistRenderer";
import { ChecklistTemplateDesignerComponent } from "../../components/checklist-template/ChecklistTemplateDesignerComponent";
import { useNavigate, useParams } from "react-router-dom";
import { API, type ChecklistTemplateDto } from "@/data/api";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

// This is your wrapper component
export function ChecklistTemplateDesignerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<ChecklistTemplate>({
    id: uuid().toString(),
    versionId: 1,
    name: "",
    description: "",
    items: [],
    created_at: new Date().toISOString(),
    updated_at: null,
    workspaceId: "",
  });

  const onChecklistTemplateSaved = async () => {
    const templateDefinition = {
      items: template.items,
    };

    const templateDto: ChecklistTemplateDto = {
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      description: template.description,
      definition: templateDefinition,
      id: template.id,
      name: template.name,
      version_id: template.versionId,
      workspace_id: template.workspaceId,
    };

    await API.checklistTempate.saveChecklistTemplate(templateDto);
    await toast.success("Lagring vellykket", {
      position: "top-center",
    });

    navigate("/");
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const template = await API.checklistTempate.findChecklistTemplate(id!);
        if (template) {
          setTemplate(template);
          return;
        }
      }

      setTemplate({
        id: uuid(),
        versionId: 1,
        name: "",
        description: "",
        items: [],
        created_at: new Date().toISOString(),
        updated_at: null,
        workspaceId: "",
      });
    })();
  }, [id]);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      <div className="flex gap-2">
        <h1 className="text-xl font-semibold">
          {id ? "Rediger sjekkliste" : "Ny sjekkliste"}
        </h1>

        <Tooltip>
          <TooltipTrigger>
            <Info></Info>
          </TooltipTrigger>
          <TooltipContent>
            Lag dine egne sjekklister som kan gjenbrukes og deles med teamet.
            Når en sjekkliste tas i bruk, blir malen grunnlaget for
            registreringen.
          </TooltipContent>
        </Tooltip>
      </div>

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
            onSave={onChecklistTemplateSaved}
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
