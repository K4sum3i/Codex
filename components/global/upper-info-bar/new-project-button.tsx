"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/lib/generated/prisma/client";
import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

export default function NewProjectButton({ user }: { user: User }) {
  const router = useRouter();

  return (
    <Button
      size={"lg"}
      disabled={!user.subscription}
      onClick={() => router.push("/create-page")}
    >
      <HugeiconsIcon icon={Plus} />
      New Project
    </Button>
  );
}
