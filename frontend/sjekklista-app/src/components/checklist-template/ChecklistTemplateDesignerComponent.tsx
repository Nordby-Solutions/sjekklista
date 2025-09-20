import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import type {
  ChecklistTemplate,
  ChecklistTemplateSection,
  ChecklistTemplateItem,
} from "@/data/models";
import { GripVertical, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { API } from "@/data/api";
import { toast } from "sonner";
import { ChecklistTemplateItemEditorDialogComponent } from "./ChecklistTemplateItemEditorDialogComponent";
import { ChecklistTemplateSectionEditorComponent } from "./ChecklistTemplateSectionEditorComponent";
import { ChecklistTemplateSortableItemComponent } from "./ChecklistTemplateSortableItemComponent";
type Props = {
  template: ChecklistTemplate;
  setTemplate: (t: ChecklistTemplate) => void;
  onSave: () => void;
};

export function ChecklistTemplateDesignerComponent({
  template,
  setTemplate,
  onSave,
}: Props) {
  const [editingItem, setEditingItem] = useState<{
    sectionId: string;
    item: ChecklistTemplateItem | null;
    isNew: boolean;
  } | null>(null);

  const saveTemplate = async () => {
    await API.checklistTempate.saveChecklistTemplate(template);
    await toast.success("Lagring vellykket", {
      position: "top-center",
    });
    onSave();
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  /* ------------------- Section helpers ------------------- */
  const addSection = () => {
    const newSection: ChecklistTemplateSection = {
      id: uuid(),
      name: "Ny seksjon",
      description: null,
      items: [],
    };
    setTemplate({ ...template, items: [...template.items, newSection] });
  };

  const removeSection = (id: string) => {
    setTemplate({
      ...template,
      items: template.items.filter((s) => s.id !== id),
    });
  };

  const updateSectionField = (
    id: string,
    field: keyof Omit<ChecklistTemplateSection, "items">,
    value: string | null
  ) => {
    setTemplate({
      ...template,
      items: template.items.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    });
  };

  /* ------------------- Item helpers ------------------- */

  const addOrUpdateItem = (sectionId: string, item: ChecklistTemplateItem) => {
    const updatedTemplate: ChecklistTemplate = {
      ...template,
      items: template.items.map((section) => {
        if (section.id !== sectionId) return section;

        const itemExists = section.items.some((i) => i.id === item.id);
        const updatedItems = itemExists
          ? section.items.map((i) => (i.id === item.id ? item : i))
          : [...section.items, item];

        return { ...section, items: updatedItems };
      }),
    };

    setTemplate(updatedTemplate);
  };

  const removeItem = (sectionId: string, itemId: string) => {
    setTemplate({
      ...template,
      items: template.items.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
          : s
      ),
    });
  };

  const showEditItemDialog = (
    sectionId: string,
    item: ChecklistTemplateItem
  ) => {
    setEditingItem({ sectionId, item, isNew: false });
  };

  const showAddItemDialog = (sectionId: string) => {
    setEditingItem({ sectionId, item: null, isNew: true });
  };

  /* ------------------- Drag handling ------------------- */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // Section reorder
    const sectionIndex = template.items.findIndex((s) => s.id === activeId);
    if (sectionIndex > -1) {
      const newIndex = template.items.findIndex((s) => s.id === overId);
      if (newIndex > -1 && newIndex !== sectionIndex) {
        setTemplate({
          ...template,
          items: arrayMove(template.items, sectionIndex, newIndex),
        });
      }
      return;
    }

    // Item reorder
    let updated = false;
    const newItems = template.items.map((section) => {
      const itemIndex = section.items.findIndex((i) => i.id === activeId);
      const overIndex = section.items.findIndex((i) => i.id === overId);
      if (itemIndex > -1 && overIndex > -1) {
        updated = true;
        return {
          ...section,
          items: arrayMove(section.items, itemIndex, overIndex),
        };
      }
      return section;
    });

    if (updated) {
      setTemplate({ ...template, items: newItems });
    }
  };

  return (
    <div className="space-y-6">
      {/* Template header */}
      <div className="space-y-2 border rounded-lg p-4 shadow-sm bg-white">
        <Input
          placeholder="Sjekkliste navn"
          value={template.name}
          onChange={(e) => setTemplate({ ...template, name: e.target.value })}
        />
        <Textarea
          placeholder="Beskrivelse av sjekklisten"
          value={template.description}
          onChange={(e) =>
            setTemplate({ ...template, description: e.target.value })
          }
        />

        <div className="flex gap-2">
          <Button onClick={addSection}>
            <Plus /> Ny seksjon
          </Button>
          <Button onClick={saveTemplate}>Lagre</Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={template.items.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {template.items.map((section) => (
              <ChecklistTemplateSortableItemComponent
                key={section.id}
                id={section.id}
                dragHandle={
                  <GripVertical className="text-gray-400 cursor-grab" />
                }
              >
                <ChecklistTemplateSectionEditorComponent
                  section={section}
                  updateSectionField={updateSectionField}
                  removeSection={removeSection}
                  showAddItemDialog={showAddItemDialog}
                  showEditItemDialog={showEditItemDialog}
                  removeItem={removeItem}
                />
              </ChecklistTemplateSortableItemComponent>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <ChecklistTemplateItemEditorDialogComponent
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        addOrUpdateItem={addOrUpdateItem}
      />
    </div>
  );
}
