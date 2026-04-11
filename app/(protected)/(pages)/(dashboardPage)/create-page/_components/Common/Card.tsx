"use client";
import { OutlineCard } from "@/lib/types";
import { useRef } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete03Icon } from "@hugeicons/core-free-icons";

type Props = {
  card: OutlineCard;
  isEditing: boolean;
  isSelected: boolean;
  editText: string;
  onEditChange: (value: string) => void;
  onEditBlur: () => void;
  onEditKeyDown: (e: React.KeyboardEvent) => void;
  onCardClick: () => void;
  onCardDoubleClick: () => void;
  onDeleteClick: () => void;
  dragHandlers: {
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
  onDragOver: (e: React.DragEvent) => void;
  dragOverStyles: React.CSSProperties;
};

export default function Card({
  card,
  isEditing,
  isSelected,
  editText,
  onEditChange,
  onEditBlur,
  onEditKeyDown,
  onCardClick,
  onCardDoubleClick,
  onDeleteClick,
  dragHandlers,
  onDragOver,
  dragOverStyles,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
      className="w-full bg-card border-border rounded-lg pt-[18px] px-5 pb-5 flex flex-col gap-[14px] relative"
      style={{
        padding: "18px 20px 20px",
      }}
    >
      <div
        style={dragOverStyles}
        draggable
        onDragOver={onDragOver}
        {...dragHandlers}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-[2px]">
            <span className="text-[11px] font-semibold tracking-[0.8px] text-muted-foreground whitespace-nowrap">
              CARD {card.order}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick();
              }}
              aria-label={`Delete card ${card.order}`}
            >
              <HugeiconsIcon icon={Delete03Icon} />
            </Button>
          </div>
        </div>
        <div
          className="flex flex-col gap-2"
          onClick={onCardClick}
          onDoubleClick={onCardDoubleClick}
        >
          {isEditing ? (
            <Input
              ref={inputRef}
              value={editText}
              onChange={(e) => onEditChange(e.target.value)}
              onBlur={onEditBlur}
              onKeyDown={onEditKeyDown}
              className="w-full bg-transparent border-none outline-none text-base font-bold text-foreground p-0 m-0"
            />
          ) : (
            <span className="w-full bg-transparent border-none outline-none text-base font-bold text-foreground p-0 m-0">
              {card.title}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
