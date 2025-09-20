import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Pen, Trash, GripVertical, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type {
  ChecklistTemplateItem,
  ChecklistTemplateSection,
} from "@/data/models";
import { ChecklistTemplateSortableItemComponent } from "./ChecklistTemplateSortableItemComponent";

type Props = {
  section: ChecklistTemplateSection;
  updateSectionField: (
    id: string,
    field: keyof Omit<ChecklistTemplateSection, "items">,
    value: string | null
  ) => void;
  removeSection: (id: string) => void;
  showAddItemDialog: (sectionId: string) => void;
  showEditItemDialog: (sectionId: string, item: ChecklistTemplateItem) => void;
  removeItem: (sectionId: string, itemId: string) => void;
};

export function ChecklistTemplateSectionEditorComponent({
  section,
  updateSectionField,
  removeSection,
  showAddItemDialog,
  showEditItemDialog,
  removeItem,
}: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex-1">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Input
          className="flex-1 font-semibold"
          placeholder="Seksjonsnavn"
          value={section.name}
          onChange={(e) =>
            updateSectionField(section.id, "name", e.target.value)
          }
        />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeSection(section.id)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Textarea
        className="mt-2"
        placeholder="Seksjonsbeskrivelse (valgfritt)"
        value={section.description ?? ""}
        onChange={(e) =>
          updateSectionField(section.id, "description", e.target.value)
        }
      />

      {/* Items */}
      <SortableContext
        items={section.items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="mt-4 space-y-2">
          {section.items.map((item) => (
            <ChecklistTemplateSortableItemComponent
              key={item.id}
              id={item.id}
              dragHandle={
                <GripVertical className="text-gray-400 cursor-grab" />
              }
            >
              <div className="flex items-center justify-between border rounded-md p-2 bg-gray-50 flex-1">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs text-gray-500">
                    {item.type} {item.required ? "(påkrevd)" : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        onClick={() => showEditItemDialog(section.id, item)}
                      >
                        <Pen className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeItem(section.id, item.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </ChecklistTemplateSortableItemComponent>
          ))}
        </div>
      </SortableContext>

      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() => showAddItemDialog(section.id)}
      >
        <Plus /> Legg til felt
      </Button>
    </div>
  );
}
