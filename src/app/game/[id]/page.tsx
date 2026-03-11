"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGameStore } from "@/lib/store";
import { questions } from "@/lib/questions";

export default function GamePage() {
  const router = useRouter();
  const params = useParams();
  const questionId = Number(params.id);
  const { name, answers, setAnswer } = useGameStore();
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!name) {
      router.replace("/");
      return;
    }
    // Restore previous answer if going back
    if (answers[questionId]) {
      setSelected(answers[questionId]);
    } else {
      setSelected(null);
    }
  }, [questionId, name, router, answers]);

  const question = questions.find((q) => q.id === questionId);

  if (!question || questionId < 1 || questionId > 10) {
    router.replace("/");
    return null;
  }

  const handleSelect = async (choice: "A" | "B") => {
    if (isTransitioning) return;
    setSelected(choice);
    setAnswer(questionId, choice);
    setIsTransitioning(true);

    setTimeout(() => {
      if (questionId === 10) {
        // Submit answers
        submitAnswers(choice);
      } else {
        router.push(`/game/${questionId + 1}`);
        setIsTransitioning(false);
      }
    }, 500);
  };

  const submitAnswers = async (lastChoice: "A" | "B") => {
    const finalAnswers = { ...answers, [questionId]: lastChoice };
    const formatted: Record<string, "A" | "B"> = {};
    for (let i = 1; i <= 10; i++) {
      formatted[String(i)] = finalAnswers[i];
    }

    try {
      await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, answers: formatted }),
      });
    } catch {
      // Still navigate to complete even if save fails
    }
    router.push("/complete");
  };

  const progress = ((questionId - 1) / 10) * 100 + (selected ? 10 : 0);

  return (
    <div className="flex flex-col min-h-screen px-5 pt-6 pb-8">
      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Q{questionId}/10</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-400 to-orange-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center animate-slide-in" key={questionId}>
        <p className="text-center text-gray-400 text-sm font-medium mb-3">
          Q{questionId}.
        </p>
        <h2 className="text-center text-lg font-bold text-gray-700 mb-8">
          당신의 선택은?
        </h2>

        {/* Option A */}
        <button
          onClick={() => handleSelect("A")}
          disabled={isTransitioning}
          className={`w-full p-6 rounded-2xl text-left mb-4 transition-all duration-300 border-2
            ${
              selected === "A"
                ? "bg-blue-500 text-white border-blue-500 scale-[1.02] shadow-lg shadow-blue-200"
                : "bg-white/80 text-gray-700 border-gray-100 hover:border-blue-300 active:scale-[0.98]"
            }`}
        >
          <span className="text-xs font-bold opacity-60 block mb-1">A</span>
          <span className="text-base font-semibold leading-snug">
            {question.optionA}
          </span>
        </button>

        {/* VS divider */}
        <div className="flex items-center justify-center my-1">
          <span className="text-xs font-extrabold text-gray-300 tracking-widest">
            VS
          </span>
        </div>

        {/* Option B */}
        <button
          onClick={() => handleSelect("B")}
          disabled={isTransitioning}
          className={`w-full p-6 rounded-2xl text-left mt-4 transition-all duration-300 border-2
            ${
              selected === "B"
                ? "bg-orange-500 text-white border-orange-500 scale-[1.02] shadow-lg shadow-orange-200"
                : "bg-white/80 text-gray-700 border-gray-100 hover:border-orange-300 active:scale-[0.98]"
            }`}
        >
          <span className="text-xs font-bold opacity-60 block mb-1">B</span>
          <span className="text-base font-semibold leading-snug">
            {question.optionB}
          </span>
        </button>
      </div>
    </div>
  );
}
