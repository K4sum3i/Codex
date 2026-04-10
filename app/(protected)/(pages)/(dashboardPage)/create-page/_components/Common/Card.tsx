"use client";
import { OutlineCard } from "@/lib/types";
import { useRef } from "react";
import { animate, motion } from "motion/react";
import { Card as UICard } from "@/components/ui/card";
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
      className="w-full bg-card border-border rounded-lg flex flex-col gap-[14px] relative"
    >
      <div
        style={dragOverStyles}
        draggable
        onDragOver={onDragOver}
        {...dragHandlers}
      >
        <UICard
          onClick={onCardClick}
          onDoubleClick={onCardDoubleClick}
          className="flex items-start justify-between gap-4"
        >
          <div>
            {isEditing ? (
              <Input
                ref={inputRef}
                value={editText}
                onChange={(e) => onEditChange(e.target.value)}
                onBlur={onEditBlur}
                onKeyDown={onEditKeyDown}
              />
            ) : (
              <div>
                <span>{card.order}</span>
                <span>{card.title}</span>
              </div>
            )}
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
        </UICard>
      </div>
    </motion.div>
  );
}
