import { ChecklistRenderer } from "@/components/ChecklistRenderer";
import { Progress } from "@/components/ui/progress";
import { API } from "@/data/api";
import type { ChecklistTemplate } from "@/data/models";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ChecklistPage() {
  const { id } = useParams();

  const [template, setTemplate] = useState<ChecklistTemplate | null>(null);

  useEffect(() => {
    (async () => {
      const data = await API.checklistTempate.findChecklistTemplate(id!);

      setTemplate(data);
    })();
  }, [id]);

  if (!template) {
    return <Progress />;
  }

  return (
    <div>
      <ChecklistRenderer previewMode={false} template={template!} />
    </div>
  );
}
