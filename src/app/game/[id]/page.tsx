"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGameStore } from "@/lib/store";
import {
  questions,
  categories,
  getCategoryForQuestion,
  TOTAL_QUESTIONS,
} from "@/lib/questions";

export default function GamePage() {
  const router = useRouter();
  const params = useParams();
  const questionId = Number(params.id);
  const { name, answers, setAnswer } = useGameStore();
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const category = getCategoryForQuestion(questionId);

  useEffect(() => {
    if (!name) {
      router.replace("/");
      return;
    }
    if (answers[questionId]) {
      setSelected(answers[questionId]);
    } else {
      setSelected(null);
    }
  }, [questionId, name, router, answers]);

  const question = questions.find((q) => q.id === questionId);

  if (!question || !category || questionId < 1 || questionId > TOTAL_QUESTIONS) {
    router.replace("/");
    return null;
  }

  const handleSelect = async (choice: "A" | "B") => {
    if (isTransitioning) return;
    setSelected(choice);
    setAnswer(questionId, choice);
    setIsTransitioning(true);

    setTimeout(() => {
      if (questionId === TOTAL_QUESTIONS) {
        submitAnswers(choice);
      } else if (questionId === category.endQuestion) {
        router.push(`/game/results/${category.id}`);
        setIsTransitioning(false);
      } else {
        router.push(`/game/${questionId + 1}`);
        setIsTransitioning(false);
      }
    }, 500);
  };

  const submitAnswers = async (lastChoice: "A" | "B") => {
    const finalAnswers = { ...answers, [questionId]: lastChoice };
    const formatted: Record<string, "A" | "B"> = {};
    for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
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

  const overallProgress =
    ((questionId - 1) / TOTAL_QUESTIONS) * 100 +
    (selected ? 100 / TOTAL_QUESTIONS : 0);
  const categoryQuestionIndex = questionId - category.startQuestion;
  const categoryTotal = category.endQuestion - category.startQuestion + 1;

  const categoryColors: Record<
    number,
    { a: string; aActive: string; b: string; bActive: string; bar: string }
  > = {
    1: {
      a: "hover:border-blue-300 hover:bg-blue-50",
      aActive: "bg-blue-500 text-white border-blue-500 shadow-blue-200",
      b: "hover:border-violet-300 hover:bg-violet-50",
      bActive: "bg-violet-500 text-white border-violet-500 shadow-violet-200",
      bar: "from-violet-400 to-blue-400",
    },
    2: {
      a: "hover:border-orange-300 hover:bg-orange-50",
      aActive: "bg-orange-500 text-white border-orange-500 shadow-orange-200",
      b: "hover:border-pink-300 hover:bg-pink-50",
      bActive: "bg-pink-500 text-white border-pink-500 shadow-pink-200",
      bar: "from-orange-400 to-pink-400",
    },
    3: {
      a: "hover:border-emerald-300 hover:bg-emerald-50",
      aActive: "bg-emerald-500 text-white border-emerald-500 shadow-emerald-200",
      b: "hover:border-teal-300 hover:bg-teal-50",
      bActive: "bg-teal-500 text-white border-teal-500 shadow-teal-200",
      bar: "from-emerald-400 to-teal-400",
    },
  };

  const colors = categoryColors[category.id];

  return (
    <div className="flex flex-col min-h-screen px-4 pt-5 pb-6">
      {/* Category badge + Progress */}
      <div className="mb-3">
        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
          <span className="font-bold">
            {category.emoji} {category.title}
          </span>
          <span>
            Q{categoryQuestionIndex + 1}/{categoryTotal} (전체 {questionId}/{TOTAL_QUESTIONS})
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${colors.bar} rounded-full transition-all duration-500`}
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center animate-slide-in" key={questionId}>
        {/* Question title with emoji */}
        <div className="text-center mb-5">
          <span className="text-4xl block mb-2">{question.emoji}</span>
          <p className="text-xs text-gray-400 font-bold mb-1">Q{questionId}.</p>
          <h2 className="text-lg font-extrabold text-gray-800">
            {question.title}
          </h2>
        </div>

        {/* Left-Right Card Layout */}
        <div className="grid grid-cols-2 gap-3 flex-1 max-h-[55vh]">
          {/* Option A */}
          <button
            onClick={() => handleSelect("A")}
            disabled={isTransitioning}
            className={`flex flex-col items-center justify-center p-4 rounded-3xl
              transition-all duration-300 border-2 text-center
              ${
                selected === "A"
                  ? `${colors.aActive} scale-[1.03] shadow-xl`
                  : `bg-white/80 text-gray-700 border-gray-100 ${colors.a} active:scale-[0.97]`
              }`}
          >
            <span className="text-2xl font-black mb-3 opacity-70">A</span>
            <span className="text-base font-bold leading-snug break-keep">
              {question.optionA}
            </span>
          </button>

          {/* Option B */}
          <button
            onClick={() => handleSelect("B")}
            disabled={isTransitioning}
            className={`flex flex-col items-center justify-center p-4 rounded-3xl
              transition-all duration-300 border-2 text-center
              ${
                selected === "B"
                  ? `${colors.bActive} scale-[1.03] shadow-xl`
                  : `bg-white/80 text-gray-700 border-gray-100 ${colors.b} active:scale-[0.97]`
              }`}
          >
            <span className="text-2xl font-black mb-3 opacity-70">B</span>
            <span className="text-base font-bold leading-snug break-keep">
              {question.optionB}
            </span>
          </button>
        </div>

        {/* VS badge */}
        <div className="flex justify-center -mt-[calc(50vh/2+16px)] pointer-events-none mb-auto">
          <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-black shadow-lg z-10">
            VS
          </div>
        </div>
      </div>
    </div>
  );
}
