import { Suspense } from "react";
import EntryForm from "./entry-form";

export default function EntryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">불러오는 중...</div>}>
      <EntryForm />
    </Suspense>
  );
}
