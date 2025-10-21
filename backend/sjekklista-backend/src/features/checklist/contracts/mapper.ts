import {
  ChecklistTemplateDto,
  ChecklistTemplatePersistenceModel,
} from "./checklist-template";

export const mapToChecklistTemplateDtoToPersistenceModel = (
  template: ChecklistTemplateDto
): ChecklistTemplatePersistenceModel => {
  return {
    created_at: template.createdAt,
    updated_at: template.updatedAt,
    description: template.description,
    definition: template.definition,
    id: template.id,
    name: template.name,
    version_id: template.versionId,
    workspace_id: template.workspaceId,
  };
};
