"use client";

import { motion } from "motion/react";
import {
  containerVariants,
  CreatePageCard,
  itemVariants,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import RecentPrompts from "./RecentPrompts";
import usePromptStore from "@/store/usePromptStore";

type Props = {
  onSelectOption: (option: string) => void;
};

export default function CreatePage({ onSelectOption }: Props) {
  const { prompts, setPage } = usePromptStore();
  return (
    <motion.div className="flex flex-col gap-8 min-w-0 overflow-auto pr-1">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-start justify-between gap-5 min-w-0 justify-center pt-4"
      >
        <motion.div
          variants={itemVariants}
          className="min-w-0 flex flex-col gap-2 items-center text-center max-w-[680px]"
        >
          <h1
            className="m-0 font-bold text-foreground"
            style={{ fontSize: "28px" }}
          >
            How would you like to create your page?
          </h1>
          <p
            className="text-muted-foreground max-w-[760px]"
            style={{ fontSize: "14px" }}
          >
            Choose an option below to get started.
          </p>
        </motion.div>
      </motion.div>
      <motion.div className="flex flex-col gap-4 min-w-0 gap-0">
        <motion.div
          variants={containerVariants}
          className="gap-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          }}
        >
          {CreatePageCard.map((option) => (
            <motion.div
              key={option.type}
              variants={itemVariants}
              className="bg-card rounded-lg  flex flex-col gap-4 min-w-0 shadow-[inset_0_0_0_1px_var(--border)] py-7 px-6 justify-between min-h-[220px]"
            >
              <motion.div
                whileHover={{
                  transition: { duration: 0.1 },
                }}
                className="flex items-start justify-between gap-3 min-w-0 justify-start pt-4"
              >
                <div className="flex flex-col gap-[6px] min-w-0 gap-[10px]">
                  <div className="text-base font-bold text-foreground truncate">
                    {option.title}
                    <span
                      className={`${option.highlight ? "text-vivid" : "text-primary"}`}
                      style={{ fontSize: "22px" }}
                    >
                      {" "}
                      {option.highlightedText}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground min-h-[36px]">
                    {option.description}
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 min-w-0 justify-start mt-auto pb-4"
              >
                <Button
                  onClick={() => onSelectOption(option.type)}
                  size={"lg"}
                  variant={option.highlight ? "default" : "outline"}
                >
                  {option.highlight ? "Generate" : "Continue"}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      {prompts.length > 0 && <RecentPrompts />}
    </motion.div>
  );
}
