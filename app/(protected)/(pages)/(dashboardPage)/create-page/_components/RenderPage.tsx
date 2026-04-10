"use client";

import usePromptStore from "@/store/usePromptStore";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import CreatePage from "./CreatePage/CreatePage";
import CodexAI from "./GenerateAI/CodexAI";

type Props = {};
export default function RenderPage(props: Props) {
  const router = useRouter();
  const { page, setPage } = usePromptStore();

  const handleBack = () => {
    setPage("create");
  };

  const handleSelectOption = (option: string) => {
    if (option === "template") router.push("/templates");
    else if (option === "create-scratch") setPage("create-scratch");
    else setPage("codex-ai");
  };

  const renderStep = () => {
    switch (page) {
      case "create":
        return <CreatePage onSelectOption={handleSelectOption} />;
      case "codex-ai":
        return <CodexAI onBack={handleBack} />;
      case "create-scratch":
        return <></>;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
}
