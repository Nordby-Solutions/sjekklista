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

export const mapToChecklistTemplatePersistenceModelToDto = (
  model: ChecklistTemplatePersistenceModel
): ChecklistTemplateDto => {
  return {
    createdAt: model.created_at,
    updatedAt: model.updated_at,
    description: model.description,
    definition: model.definition,
    id: model.id,
    name: model.name,
    versionId: model.version_id,
    workspaceId: model.workspace_id,
  };
};
