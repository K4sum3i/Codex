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
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import useCodexAIStore from "@/store/useCodexAIStore";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CardList from "../Common/CardList";
import usePromptStore from "@/store/usePromptStore";
import RecentPrompts from "./RecentPrompts";
import { sileo } from "sileo";
import { OutlineCard } from "@/lib/types";
import { v4 as uuid } from "uuid";
import { generateCodexPrompt } from "@/actions/gemini";
import { createProject } from "@/actions/projects";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  onBack: () => void;
};

export default function CodexAI({ onBack }: Props) {
  const router = useRouter();
  const { setProject } = useSlideStore();
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [noOfCards, setNoOfCards] = useState(0);
  const { prompts, addPrompt } = usePromptStore();

  const {
    outlines,
    addOutline,
    addMultipleOutlines,
    resetOutlines,
    currentAiPrompt,
    setCurrentAiPrompt,
  } = useCodexAIStore();

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

  const generateOutline = async () => {
    if (currentAiPrompt === "") {
      sileo.error({
        title: "Error",
        description: "Please enter a prompt to generate an outline",
      });
      return;
    }

    setIsGenerating(true);
    const res = await generateCodexPrompt(currentAiPrompt);
    if (res.status === 200 && res?.data?.outlines) {
      const cardsData: OutlineCard[] = [];
      res.data?.outlines.map((outline: string, idx: number) => {
        const newCard = {
          id: uuid(),
          title: outline,
          order: idx + 1,
        };
        cardsData.push(newCard);
      });
      addMultipleOutlines(cardsData);
      setNoOfCards(cardsData.length);
      sileo.success({
        title: "Succes",
        description: "Outlines generated successfully!",
      });
    } else {
      sileo.error({
        title: "Error",
        description: "Failed to generate outline. Please try again.",
      });
    }
    setIsGenerating(false);
  };

  useEffect(() => {
    setNoOfCards(outlines.length);
  }, [outlines.length]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    if (outlines.length === 0) {
      sileo.error({
        title: "Error",
        description: "Please add at least one card to generate slides",
      });
      return;
    }
    try {
      const res = await createProject(
        currentAiPrompt,
        outlines.slice(0, noOfCards),
      );

      if (res.status !== 200 || !res.data)
        throw new Error("Unable to create project");

      router.push(`/presentation/${res.data.id}/select-theme`);
      setProject(res.data);

      addPrompt({
        id: uuid(),
        title: currentAiPrompt || outlines?.[0]?.title,
        outlines: outlines,
        createdAt: new Date().toISOString(),
      });
      sileo.success({
        title: "Succes",
        description: "Project created successfully!",
      });
      setCurrentAiPrompt("");
      resetOutlines();
    } catch (error) {
      console.log(error);
      sileo.error({
        title: "Error",
        description: "Failed to create project",
      });
    } finally {
      setIsGenerating(false);
    }
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
              <SelectTrigger>
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
            <Button
              size={"lg"}
              variant={"default"}
              disabled={isGenerating}
              onClick={generateOutline}
            >
              {isGenerating ? (
                <>
                  <Spinner />
                </>
              ) : (
                "Generate Outline"
              )}
            </Button>
          </div>
        </div>

        <CardList
          outlines={outlines}
          addOutline={addOutline}
          addMultipleOutlines={addMultipleOutlines}
          editingCard={editingCard}
          selectedCard={selectedCard}
          editText={editText}
          onEditChange={setEditText}
          onCardSelect={setSelectedCard}
          setEditText={setEditText}
          setEditingCard={setEditingCard}
          setSelectedCard={setSelectedCard}
          onCardDoubleClick={(id, title) => {
            setEditingCard(id);
            setEditText(title);
          }}
        />

        {outlines.length > 0 && (
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Spinner />
              </>
            ) : (
              "Generate"
            )}
          </Button>
        )}

        {prompts?.length > 0 && <RecentPrompts />}
      </div>
    </div>
  );
}
