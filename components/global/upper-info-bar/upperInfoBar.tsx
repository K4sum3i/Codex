import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@/lib/generated/prisma/client";
import SearchBar from "./upper-info-searchbar";
import ThemeSwitcher from "../mode-toggle/mode-toggle";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Share } from "@hugeicons/core-free-icons";
import NewProjectButton from "./new-project-button";

type Props = {
  user: User;
};

export default function UpperInfoBar({ user }: Props) {
  return (
    <header className="flex items-center justify-between gap-4 pt-1 px-1 pb-0">
      <div className="flex items-center gap-3 min-w-0">
        <SidebarTrigger className="inline-flex items-center justify-center gap-2 py-[10px] px-3 rounded-md text-sm font-semibold whitespace-nowrap bg-secondary text-secondary-foreground" />
        <Separator
          orientation="vertical"
          className="w-[1px] align-stretch bg-border shrink-0"
        />
        <SearchBar />
      </div>
      <div className="flex items-center gap-3 min-w-0">
        <ThemeSwitcher />
        <Button size={"lg"} variant={"outline"}>
          <HugeiconsIcon icon={Share} size={18} />
          Import
        </Button>
        <NewProjectButton user={user} />
      </div>
    </header>
  );
}
