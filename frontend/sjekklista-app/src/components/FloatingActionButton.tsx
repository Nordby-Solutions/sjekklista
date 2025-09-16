import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList, FileText, Settings } from "lucide-react";

type ActionItem = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

interface FloatingActionMenuProps {
  items: ActionItem[];
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-slate-100 text-slate-700 text-sm"
    >
      {icon}
      {label}
    </button>
  );
}

export default function FloatingActionMenu({ items }: FloatingActionMenuProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="rounded-full h-14 w-14 bg-brand-purple text-white shadow-lg hover:bg-purple-700"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-4 space-y-2">
          {items.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
