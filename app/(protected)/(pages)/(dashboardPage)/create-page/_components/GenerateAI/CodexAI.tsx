"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useCodexAIStore from "@/store/useCodexAIStore";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  onBack: () => void;
};

export default function CodexAI({ onBack }: Props) {
  const router = useRouter();
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const [noOfCards, setNoOfCards] = useState(0);

  const { currentAiPrompt, setCurrentAiPrompt, outlines, resetOutlines } =
    useCodexAIStore();

  const handleBack = () => {
    onBack();
  };

  const resetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");

    setCurrentAiPrompt("");
    resetOutlines();
  };

  return (
    <div className="flex flex-col gap-7 min-w-0 overflow-hidden px-4">
      <div className="mt-5 mx-auto w-full max-w-[840px] flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Button size={"lg"} onClick={handleBack} variant={"outline"}>
            <HugeiconsIcon icon={ArrowLeft02Icon} />
          </Button>
          <h1
            className="m-0 font-bold text-foreground"
            style={{ fontSize: "28px" }}
          >
            Generate with Codex AI
          </h1>
        </div>

        <div
          className="bg-card shadow-[inset_0_0_0_1px_var(--border)] rounded-lg flex flex-col gap-6"
          style={{ padding: "32px" }}
        >
          <div className="flex flex-col gap-3">
            <Label className="font-semibold text-foreground text-sm">
              What is your presentation about?
            </Label>
            <Textarea
              className="w-full bg-transparent border-border rounded-md p-4 text-sm text-foreground resize-none leading-[1.5]"
              style={{ minHeight: "140px" }}
              placeholder="E.g., An investor pitch deck for an AI presentation startup focused on small teams, including traction, pricing, and roadmap..."
              required
              value={currentAiPrompt || ""}
              onChange={(e) => {
                setCurrentAiPrompt(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <Label className="font-semibold text-foreground text-sm">
              Number of slides
            </Label>
            <Select
              value={noOfCards.toString()}
              onValueChange={(value) => setNoOfCards(parseInt(value))}
            >
              <SelectTrigger className="inline-flex items-center justify-between gap-3 w-[180px] h-10 px-4 bg-transparent border-border rounded-md text-sm text-foreground">
                <SelectValue placeholder="Select a cards" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {outlines.length === 0 ? (
                    <SelectItem value="0">No cards</SelectItem>
                  ) : (
                    Array.from(
                      { length: outlines.length },
                      (_, idx) => idx + 1,
                    ).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Card" : "Cards"}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div
            className="flex pt-6 border-t border-border mt-8"
            style={{
              paddingTop: "24px",
              justifyContent: "end",
            }}
          >
            <Button size={"lg"} variant={"outline"}>
              Generate Outline
            </Button>
          </div>
        </div>
      </div>
    </div>

    /*     <div className="flex flex-col gap-8 min-w-0 overflow-auto pr-1">
      <div className="flex flex-col gap-8 max-w-[840px] mx-auto w-full pb-10">
        <div className="flex items-center justify-center gap-5 min-w-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-w-0 flex flex-col gap-2"
          >
            <Button size={"lg"} onClick={handleBack} variant={"outline"}>
              <HugeiconsIcon icon={ArrowLeft02Icon} />
              Back
            </Button>
          </motion.div>
          <h1
            className="m-0 font-bold text-foreground"
            style={{ fontSize: "28px" }}
          >
            Generate with <span style={{ fontSize: "32px" }}>Codex AI</span>
          </h1>
        </div>
      </div>
    </div> */
  );
}
