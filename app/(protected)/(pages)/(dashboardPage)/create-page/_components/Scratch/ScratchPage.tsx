"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "@/components/ui/textarea";
import { containerVariants } from "@/lib/constants";
import useScractchStore from "@/store/useScratchStore";
import { ArrowLeft02Icon, Rotate01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CardList from "../Common/CardList";
import { OutlineCard } from "@/lib/types";
import { sileo } from "sileo";
import { createProject } from "@/actions/projects";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  onBack: () => void;
};

export default function ScratchPage({ onBack }: Props) {
  const router = useRouter();
  const { setProject } = useSlideStore();
  const { outlines, resetOutlines, addOutline, addMultipleOutlines } =
    useScractchStore();
  const [editText, setEditText] = useState("");
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleBack = () => {
    resetOutlines();
    onBack();
  };

  const resetCards = () => {
    setEditText("");
    resetOutlines();
  };

  const handleAddCard = () => {
    const newCard: OutlineCard = {
      id: uuidv4(),
      title: editText || "New Section",
      order: outlines.length + 1,
    };
    setEditText("");
    addOutline(newCard);
  };

  const handleGenerate = async () => {
    if (outlines.length === 0) {
      sileo.error({
        title: "Error",
        description: "Please add at least one card to generate slides",
      });
      return;
    }

    const res = await createProject(outlines?.[0]?.title, outlines);

    if (res.status !== 200) {
      sileo.error({
        title: "Error",
        description: res.error || "Failed to create project",
      });
      return;
    }

    if (res.data) {
      setProject(res.data);
      resetOutlines();
      sileo.success({
        title: "Success",
        description: res.error || "Project created successfully",
      });
      router.push(`/presentation/${res.data.id}/select-theme`);
    } else {
      sileo.error({
        title: "Error",
        description: "Failed to create project",
      });
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-7 min-w-0 overflow-hidden px-4"
    >
      <div className="mt-5 mx-auto w-full max-w-[840px] flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Button size={"lg"} onClick={handleBack} variant={"outline"}>
            <HugeiconsIcon icon={ArrowLeft02Icon} />
          </Button>
          <h1
            className="m-0 font-bold text-foreground"
            style={{ fontSize: "28px" }}
          >
            Prompt
          </h1>
        </div>

        <div className="flex flex-col gap-4 bg-secondary p-6 rounded-lg w-full">
          <Textarea className="w-full min-h-40 bg-card border-border rounded-md p-4 text-sm text-foreground resize-none leading-[1.5]" />
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Select
                value={outlines.length > 0 ? outlines.length.toString() : "0"}
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
            <Button variant={"outline"} size={"lg"} onClick={resetCards}>
              <HugeiconsIcon icon={Rotate01Icon} />
              Reset cards
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
        <Button variant={"secondary"} size={"lg"} onClick={handleAddCard}>
          Add Card
        </Button>

        {outlines?.length > 0 && (
          <Button variant={"default"} size={"lg"} onClick={handleGenerate}>
            Generate PPT
          </Button>
        )}
      </div>
    </motion.div>
  );
}
