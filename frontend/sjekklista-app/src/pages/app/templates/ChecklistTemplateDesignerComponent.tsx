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
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import type {
  ChecklistTemplate,
  ChecklistTemplateSection,
  ChecklistTemplateItem,
} from "@/data/models";

import { Pen, Trash, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Checkbox } from "@/components/ui/checkbox";
import { API, api } from "@/data/api";
import { toast } from "sonner";

/* ------------------- Sortable wrapper ------------------- */
function SortableItem({
  id,
  children,
  dragHandle,
}: {
  id: string;
  children: React.ReactNode;
  dragHandle?: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-center gap-2">
        {dragHandle ? (
          <button
            type="button"
            {...listeners}
            className="cursor-grab touch-none"
          >
            {dragHandle}
          </button>
        ) : null}
        {children}
      </div>
    </div>
  );
}

/* ------------------- Section Editor ------------------- */
function SectionEditor({
  section,
  updateSectionField,
  removeSection,
  addItem,
  // updateItem,
  removeItem,
  setEditingItem,
}: {
  section: ChecklistTemplateSection;
  updateSectionField: (
    id: string,
    field: keyof Omit<ChecklistTemplateSection, "items">,
    value: string | null
  ) => void;
  removeSection: (id: string) => void;
  addItem: (sectionId: string) => void;
  updateItem: (sectionId: string, item: ChecklistTemplateItem) => void;
  removeItem: (sectionId: string, itemId: string) => void;
  setEditingItem: (
    edit: { sectionId: string; item: ChecklistTemplateItem | null } | null
  ) => void;
}) {
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
            <SortableItem
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
                        onClick={() =>
                          setEditingItem({ sectionId: section.id, item })
                        }
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
            </SortableItem>
          ))}
        </div>
      </SortableContext>

      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() => addItem(section.id)}
      >
        ➕ Legg til felt
      </Button>
    </div>
  );
}

/* ------------------- Item Editor Dialog ------------------- */
function ItemEditorDialog({
  editingItem,
  setEditingItem,
  updateItem,
}: {
  editingItem: { sectionId: string; item: ChecklistTemplateItem | null } | null;
  setEditingItem: (
    edit: { sectionId: string; item: ChecklistTemplateItem | null } | null
  ) => void;
  updateItem: (sectionId: string, item: ChecklistTemplateItem) => void;
}) {
  return (
    <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger felt</DialogTitle>
        </DialogHeader>
        {editingItem?.item && (
          <div className="space-y-4">
            <Input
              placeholder="Label"
              value={editingItem.item.label}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  item: { ...editingItem.item!, label: e.target.value },
                })
              }
            />
            <Textarea
              placeholder="Tilleggsinfo (valgfritt)"
              value={editingItem.item.info ?? ""}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  item: { ...editingItem.item!, info: e.target.value },
                })
              }
            />
            <Select
              value={editingItem.item.type}
              onValueChange={(val: string) =>
                setEditingItem({
                  ...editingItem,
                  item: {
                    ...editingItem.item!,
                    type: val as ChecklistTemplateItem["type"],
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Velg type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="textfield">Tekstfelt</SelectItem>
                <SelectItem value="textarea">Stort tekstfelt</SelectItem>
                <SelectItem value="checkbox">Avkryssing</SelectItem>
                <SelectItem value="date">Dato</SelectItem>
                <SelectItem value="number">Tall</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={editingItem.item.required}
                onCheckedChange={(val: boolean) =>
                  setEditingItem({
                    ...editingItem,
                    item: { ...editingItem.item!, required: !!val },
                  })
                }
              />
              <span>Påkrevd</span>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            onClick={() => {
              if (editingItem?.item)
                updateItem(editingItem.sectionId, editingItem.item);
              setEditingItem(null);
            }}
          >
            Lagre
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------- Main Designer Component ------------------- */
export function ChecklistTemplateDesignerComponent({
  template,
  setTemplate,
}: {
  template: ChecklistTemplate;
  setTemplate: (t: ChecklistTemplate) => void;
}) {
  const [editingItem, setEditingItem] = useState<{
    sectionId: string;
    item: ChecklistTemplateItem | null;
  } | null>(null);

  const saveTemplate = async () => {
    await API.checklistTempate.saveChecklistTemplate(template);
    toast("Lagring vellykket");
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
  const addItem = (sectionId: string) => {
    const newItem: ChecklistTemplateItem = {
      id: uuid(),
      label: "Nytt felt",
      info: null,
      type: "textfield",
      required: false,
    };
    setTemplate({
      ...template,
      items: template.items.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
      ),
    });
  };

  const updateItem = (sectionId: string, item: ChecklistTemplateItem) => {
    setTemplate({
      ...template,
      items: template.items.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.map((i) => (i.id === item.id ? item : i)) }
          : s
      ),
    });
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

  /* ------------------- JSX ------------------- */
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
          <Button onClick={addSection}>➕ Ny seksjon</Button>
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
              <SortableItem
                key={section.id}
                id={section.id}
                dragHandle={
                  <GripVertical className="text-gray-400 cursor-grab" />
                }
              >
                <SectionEditor
                  section={section}
                  updateSectionField={updateSectionField}
                  removeSection={removeSection}
                  addItem={addItem}
                  updateItem={updateItem}
                  removeItem={removeItem}
                  setEditingItem={setEditingItem}
                />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <ItemEditorDialog
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        updateItem={updateItem}
      />
    </div>
  );
}
