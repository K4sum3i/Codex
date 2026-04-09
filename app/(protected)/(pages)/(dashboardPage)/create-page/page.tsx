import { Suspense } from "react";
import RenderPage from "./_components/RenderPage";
import CreatePageSkeleton from "./_components/CreatePage/CreatePageSkeleton";

type Props = {};

export default function Page(props: Props) {
  return (
    <main>
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  );
}
