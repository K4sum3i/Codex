import { HugeiconsIcon } from "@hugeicons/react";
import { Spinner } from "@hugeicons/core-free-icons";

export default function AuthLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <HugeiconsIcon icon={Spinner} className="animate-spin" />
    </div>
  );
}
