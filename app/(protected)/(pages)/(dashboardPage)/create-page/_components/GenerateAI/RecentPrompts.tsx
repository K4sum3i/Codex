"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import usePromptStore from "@/store/usePromptStore";
import { containerVariants, itemVariants } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import useCodexAIStore from "@/store/useCodexAIStore";
import { sileo } from "sileo";

type Props = {};

export default function RecentPrompts(props: Props) {
  const { prompts, setPage } = usePromptStore();
  const { addMultipleOutlines, setCurrentAiPrompt } = useCodexAIStore();

  const handleEdit = (id: string) => {
    const prompt = prompts.find((prompt) => prompt?.id === id);

    if (prompt) {
      setPage("codex-ai");
      addMultipleOutlines(prompt?.outlines);
      setCurrentAiPrompt(prompt?.title);
    } else {
      sileo.error({
        title: "Error",
        description: "Prompt not found",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 min-w-0 gap-5 pt-2">
      <div className="flex items-center justify-between gap-4 min-w-0 justify-center">
        <motion.div
          variants={containerVariants}
          className="flex flex-col gap-1 min-w-0 items-center text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="font-bold text-foreground whitespace-nowrap"
            style={{ fontSize: "22px" }}
          >
            Your recent prompts
          </motion.h2>
        </motion.div>
      </div>
      <motion.div
        variants={containerVariants}
        className="flex flex-col gap-3 w-full max-w-[920px] align-center"
      >
        {prompts.map((prompt, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-card shadow-[inset_0_0_0_1px_var(--border)] rounded-lg p-4 gap-16 items-center"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.6fr) minmax(160px, 0.7fr) auto",
            }}
          >
            <div className="flex flex-start gap-3 min-w-0">
              <div className="min-w-0 flex flex-col gap-1">
                <div className="text-sm font-semibold text-foreground truncate">
                  {prompt?.title}
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {timeAgo(prompt?.createdAt)}
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground truncate">
              Codex AI
            </div>
            <Button
              size={"lg"}
              variant={"outline"}
              onClick={() => handleEdit(prompt?.id)}
            >
              Edit
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
