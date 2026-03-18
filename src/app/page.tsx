"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const setName = useGameStore((s) => s.setName);
  const reset = useGameStore((s) => s.reset);
  const [input, setInput] = useState("");

  const handleStart = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    reset();
    setName(trimmed);
    router.push("/game/intro/1");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
      <div className="text-6xl mb-4 animate-bounce-slow">&#9878;</div>
      <h1 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
        웨파 GWP 행사
      </h1>
      <p className="text-gray-500 mb-10 text-center text-sm">
        3가지 카테고리, 22문제로 알아보는 나의 가치관
      </p>

      <div className="w-full max-w-xs">
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleStart()}
          maxLength={20}
          className="w-full px-5 py-4 text-lg rounded-2xl border-2 border-gray-200
                     focus:border-violet-400 focus:outline-none text-center
                     bg-white/80 backdrop-blur-sm transition-colors"
        />
        <button
          onClick={handleStart}
          disabled={!input.trim()}
          className="w-full mt-4 py-4 text-lg font-bold rounded-2xl
                     bg-violet-500 text-white
                     hover:bg-violet-600 active:scale-[0.98]
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     transition-all duration-200"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
