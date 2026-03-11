"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGameStore } from "@/lib/store";
import { categories } from "@/lib/questions";

export default function CategoryIntroPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = Number(params.categoryId);
  const name = useGameStore((s) => s.name);

  useEffect(() => {
    if (!name) {
      router.replace("/");
    }
  }, [name, router]);

  const category = categories.find((c) => c.id === categoryId);

  if (!category || !name) return null;

  const handleStart = () => {
    router.push(`/game/${category.startQuestion}`);
  };

  const categoryColors = [
    "from-violet-500 to-blue-500",
    "from-orange-500 to-pink-500",
    "from-emerald-500 to-teal-500",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
      <div className="text-7xl mb-6">{category.emoji}</div>

      <div className="text-xs font-bold text-gray-400 tracking-widest mb-2">
        STAGE {category.id} / 3
      </div>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
        {category.title}
      </h1>
      <p className="text-gray-500 text-center text-sm mb-3">
        {category.subtitle}
      </p>
      <p className="text-xs text-gray-400 text-center mb-8 italic">
        {category.description}
      </p>

      <div className="text-xs text-gray-400 mb-4">
        Q{category.startQuestion} ~ Q{category.endQuestion} ({category.endQuestion - category.startQuestion + 1}문제)
      </div>

      <button
        onClick={handleStart}
        className={`px-10 py-4 text-lg font-bold rounded-2xl text-white
                   bg-gradient-to-r ${categoryColors[category.id - 1]}
                   hover:opacity-90 active:scale-[0.98]
                   transition-all duration-200 shadow-lg`}
      >
        시작하기
      </button>
    </div>
  );
}
