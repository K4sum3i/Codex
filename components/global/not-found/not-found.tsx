import { Button } from "@/components/ui/button";
import { Plus, Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function NotFound() {
  return (
    <div className="flex 1 h-full flex items-center justify-center p-6 rounded-lg bg-gradient-to-b from-[var(--card)] to-[var(--secondary)] shadow-[inset_0_0_0_1px_var(--border)]">
      <div className="w-full max-w-[420px] m-auto flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-[52px] h-[52px] rounded-full bg-secondary flex items-center justify-center">
          <HugeiconsIcon icon={Search} size={20} className="text-foreground" />
        </div>
        <div className="text-2xl font-bold text-foreground max-w-[320px]">
          No presentations found
        </div>
        <div className="text-sm text-muted-foreground max-w-[320px]">
          Try another keyword or create a new project.
        </div>
        <div className="flex items-center justify-center gap-[10px] flex-wrap pt-1">
          <Button size={"lg"} variant={"outline"}>
            Reset search
          </Button>
          <Button size={"lg"}>
            <HugeiconsIcon icon={Plus} />
            New Project
          </Button>
        </div>
      </div>
    </div>
  );
}
