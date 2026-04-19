import { Suspense } from "react";
import ResultsClient from "./ResultsClient";

export const metadata = {
  title: "D-TAS | Your Report",
};

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Generating your report…
      </div>
    }>
      <ResultsClient />
    </Suspense>
  );
}
