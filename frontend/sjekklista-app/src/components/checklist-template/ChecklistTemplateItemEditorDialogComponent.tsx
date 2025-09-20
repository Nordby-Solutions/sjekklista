import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";
import type { ChecklistTemplateItem } from "@/data/models";

type Props = {
  editingItem: {
    sectionId: string;
    item: ChecklistTemplateItem | null;
    isNew: boolean;
  } | null;
  setEditingItem: (edit: Props["editingItem"]) => void;
  addOrUpdateItem: (sectionId: string, item: ChecklistTemplateItem) => void;
};

export function ChecklistTemplateItemEditorDialogComponent({
  editingItem,
  setEditingItem,
  addOrUpdateItem,
}: Props) {
  const [draftItem, setDraftItem] = useState<ChecklistTemplateItem | null>(
    null
  );

  useEffect(() => {
    if (!editingItem) {
      setDraftItem(null);
      return;
    }

    if (editingItem.isNew) {
      setDraftItem({
        id: uuid(),
        label: "",
        info: null,
        type: "textfield",
        required: false,
      });
    } else {
      setDraftItem(editingItem.item);
    }
  }, [editingItem]);

  const handleChange = <K extends keyof ChecklistTemplateItem>(
    key: K,
    value: ChecklistTemplateItem[K]
  ) => {
    if (!draftItem) return;
    setDraftItem({ ...draftItem, [key]: value });
  };

  const handleSave = () => {
    if (editingItem && draftItem) {
      addOrUpdateItem(editingItem.sectionId, draftItem);
    }
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setDraftItem(null);
  };

  return (
    <Dialog open={!!editingItem} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingItem?.isNew ? "Nytt felt" : "Rediger felt"}
          </DialogTitle>
        </DialogHeader>

        {draftItem && (
          <div className="space-y-4">
            <Input
              placeholder="Feltnavn"
              value={draftItem.label}
              onChange={(e) => handleChange("label", e.target.value)}
            />
            <Textarea
              placeholder="Tilleggsinfo (valgfritt)"
              value={draftItem.info ?? ""}
              onChange={(e) => handleChange("info", e.target.value)}
            />
            <Select
              value={draftItem.type}
              onValueChange={(val) =>
                handleChange("type", val as ChecklistTemplateItem["type"])
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
                <SelectItem value="signature">Signatur</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={draftItem.required}
                onCheckedChange={(val) => handleChange("required", !!val)}
              />
              <span>Påkrevd</span>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={handleSave}>Lukk</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
