import { useState } from "react";
import { Rnd } from "react-rnd";
import type { ReportBlock } from "./types";

type Props = {
  block: ReportBlock;
  onUpdate: (updated: ReportBlock) => void;
};

const styleMap = {
  h1: "text-2xl font-bold",
  h2: "text-xl font-bold",
  h3: "text-lg font-semibold",
  body: "text-sm",
};

function snap(value: number, step = 40): number {
  return Math.round(value / step) * step;
}

export function ReportDesignerBlockItem({ block, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);

  return (
    <Rnd
      position={{ x: block.x, y: block.y }}
      size={{ width: block.width, height: block.height }}
      bounds="parent"
      onDragStop={(_, d) => onUpdate({ ...block, x: snap(d.x), y: snap(d.y) })}
      // onResizeStop={(e, dir, ref, delta, pos) =>
      onResizeStop={(_, __, ref, ___, pos) =>
        onUpdate({
          ...block,
          width: snap(ref.offsetWidth),
          height: snap(ref.offsetHeight),
          x: snap(pos.x),
          y: snap(pos.y),
        })
      }
      className="absolute bg-white border p-2 shadow-sm"
    >
      {block.type === "field" ? (
        <>
          <div className="text-sm font-medium">{block.label}</div>
          <div className="text-xs text-gray-500">[verdi]</div>
        </>
      ) : editing ? (
        <textarea
          value={block.label}
          onChange={(e) => onUpdate({ ...block, label: e.target.value })}
          onBlur={() => setEditing(false)}
          className={`w-full h-full resize-none ${
            styleMap[block.style ?? "body"]
          }`}
        />
      ) : (
        <div
          className={`${styleMap[block.style ?? "body"]} cursor-text`}
          onClick={() => setEditing(true)}
        >
          {block.label || "Klikk for å redigere"}
        </div>
      )}
    </Rnd>
  );
}
