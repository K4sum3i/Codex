"use client";
import { Button } from "@/components/ui/button";
import { PlusSignCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Props = {
  onAddCard: () => void;
};

export default function AddCardButton({ onAddCard }: Props) {
  const [showGap, setShowGap] = useState(false);

  return (
    <motion.div
      initial={{ height: "0.5rem" }}
      animate={{
        height: showGap ? "2rem" : "0.5rem",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      onHoverStart={() => setShowGap(true)}
      onHoverEnd={() => setShowGap(false)}
    >
      <AnimatePresence>
        {showGap && (
          <motion.div className="flex items-center gap-[14px] w-full py-[2px] px-0">
            <div
              className="flex-1 bg-border"
              style={{
                height: "1px",
              }}
            />
            <Button
              variant={"outline"}
              size={"lg"}
              onClick={onAddCard}
              aria-label="Add new card"
            >
              <HugeiconsIcon icon={PlusSignCircleIcon} />
            </Button>
            <div
              className="flex-1 bg-border"
              style={{
                height: "1px",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
