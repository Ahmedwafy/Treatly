import Confirmation from "@/components/Confirmation";
import { Suspense } from "react";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="p-6">
        <Confirmation />
      </main>
    </Suspense>
  );
}
