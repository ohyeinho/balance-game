"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGameStore } from "@/lib/store";
import { questions, categories } from "@/lib/questions";

export default function CategoryResultsPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = Number(params.categoryId);
  const name = useGameStore((s) => s.name);
  const answers = useGameStore((s) => s.answers);

  useEffect(() => {
    if (!name) {
      router.replace("/");
    }
  }, [name, router]);

  const category = categories.find((c) => c.id === categoryId);
  const categoryQuestions = questions.filter((q) => q.category === categoryId);

  if (!category || !name) return null;

  const buttonGradients: Record<number, string> = {
    1: "from-violet-500 to-blue-500",
    2: "from-emerald-500 to-teal-500",
    3: "from-orange-500 to-pink-500",
  };

  const handleContinue = () => {
    if (categoryId < 3) {
      router.push(`/game/intro/${categoryId + 1}`);
    } else {
      router.push("/complete");
    }
  };

  const buttonLabel = categoryId < 3 ? "다음 카테고리로" : "결과 보기";
  const gradient = buttonGradients[categoryId] ?? "from-violet-500 to-blue-500";

  return (
    <div className="min-h-screen px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">{category.emoji}</div>
        <p className="text-xs font-bold text-gray-400 tracking-widest mb-1">
          STAGE {category.id} / 3
        </p>
        <h1 className="text-2xl font-extrabold text-gray-800">결과 확인</h1>
        <p className="text-sm text-gray-500 mt-1">{category.title}</p>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        {categoryQuestions.map((q, idx) => {
          const selected = answers[q.id];
          return (
            <div
              key={q.id}
              className="bg-white/80 rounded-2xl border border-gray-100 p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{q.emoji}</span>
                <span className="text-xs font-bold text-gray-400">
                  Q{idx + 1}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-800 mb-3">{q.title}</p>

              {/* Option A */}
              <div
                className={`rounded-xl px-4 py-3 mb-2 text-sm font-medium transition-colors ${
                  selected === "A"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <span className="font-bold mr-2">A</span>
                {q.optionA}
              </div>

              {/* Option B */}
              <div
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  selected === "B"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <span className="font-bold mr-2">B</span>
                {q.optionB}
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue button */}
      <div className="flex justify-center mt-8 mb-4 max-w-xl mx-auto">
        <button
          onClick={handleContinue}
          className={`w-full px-10 py-4 text-lg font-bold rounded-2xl text-white
                     bg-gradient-to-r ${gradient}
                     hover:opacity-90 active:scale-[0.98]
                     transition-all duration-200 shadow-lg`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
