import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  children: React.ReactNode;
  dragHandle?: React.ReactNode;
};

export function ChecklistTemplateSortableItemComponent({
  id,
  children,
  dragHandle,
}: Props) {
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
