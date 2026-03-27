import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function SearchBar() {
  return (
    <div className="relative">
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute left-1 top-1/2 -translate-y-1/2 active:not-aria-[haspopup]:-translate-y-1/2 h-8 w-8 text-muted-foreground"
      >
        <HugeiconsIcon icon={Search} size={18} />
        <span className="sr-only">Search</span>
      </Button>
      <Input
        type="text"
        placeholder="Search by title"
        className="min-w-[360px] bg-input shadow-2xs rounded-md py-[10px] pl-11 pr-3 text-muted-foreground"
      ></Input>
    </div>
  );
}
