import type { JSX } from "react";
import type { ChecklistField, ReportBlock } from "./types";
import { ReportDesignerBlockItem } from "./ReportDesignerBlockItem";

type Props = {
  layout: ReportBlock[];
  setLayout: React.Dispatch<React.SetStateAction<ReportBlock[]>>;
};

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const PADDING = 40;

function GridLines() {
  const lines: JSX.Element[] = [];
  for (let y = 0; y < A4_HEIGHT; y += 40) {
    lines.push(
      <div
        key={`h-${y}`}
        className="absolute left-0 w-full border-t border-dashed border-gray-300"
        style={{ top: `${y}px` }}
      />
    );
  }
  for (let x = 0; x < A4_WIDTH; x += 40) {
    lines.push(
      <div
        key={`v-${x}`}
        className="absolute top-0 h-full border-l border-dashed border-gray-300"
        style={{ left: `${x}px` }}
      />
    );
  }
  return <>{lines}</>;
}

export function ReportDesignerCanvas({ layout, setLayout }: Props) {
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("field");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      const canvasRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - canvasRect.left - PADDING;
      const y = e.clientY - canvasRect.top - PADDING;

      let newBlock: ReportBlock;

      if ("type" in parsed && parsed.type === "text") {
        newBlock = {
          id: crypto.randomUUID(),
          type: "text",
          label: "",
          style: parsed.style,
          x,
          y,
          width: 300,
          height: 50,
        };
      } else {
        const field: ChecklistField = parsed;
        newBlock = {
          id: crypto.randomUUID(),
          type: "field",
          label: field.label,
          fieldKey: field.id,
          x,
          y,
          width: 200,
          height: 60,
        };
      }

      setLayout((prev) => [...prev, newBlock]);
    } catch (err) {
      console.warn("Invalid drop payload:", err);
    }
  }

  return (
    <div
      className="relative bg-gray-100 flex justify-center items-start p-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div
        className="relative bg-white border shadow-sm"
        style={{
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
          boxSizing: "content-box",
          padding: `${PADDING}px`,
        }}
      >
        <GridLines />
        {layout.map((block, index) => (
          <ReportDesignerBlockItem
            key={block.id}
            block={block}
            onUpdate={(updatedBlock) => {
              const updated = [...layout];
              updated[index] = updatedBlock;
              setLayout(updated);
            }}
          />
        ))}
      </div>
    </div>
  );
}
