"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checklistRegistrationSchema = exports.checklistRegistrationItemSchema = void 0;
const zod_1 = require("zod");
exports.checklistRegistrationItemSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    templateItemId: zod_1.z.uuid(),
    templateSectionId: zod_1.z.string().uuid(),
    value: zod_1.z.union([zod_1.z.string(), zod_1.z.boolean(), zod_1.z.null()]),
    completedAt: zod_1.z.string().nullable(),
    completedBy: zod_1.z.string().nullable(),
});
exports.checklistRegistrationSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    templateId: zod_1.z.uuid(),
    templateVersionId: zod_1.z.string().uuid(),
    status: zod_1.z.enum(["draft", "not_started", "in_progress", "completed"]),
    assignedTo: zod_1.z.string().nullable(),
    dueDatetime: zod_1.z.string().nullable(), // ← if you rename this, TypeScript will catch it
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    createdBy: zod_1.z.string(),
    updatedBy: zod_1.z.string(),
    items: zod_1.z.array(exports.checklistRegistrationItemSchema),
});
