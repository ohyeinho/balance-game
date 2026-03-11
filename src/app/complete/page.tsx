"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store";

const CONFETTI_COLORS = [
  "#8B5CF6", "#F97316", "#3B82F6", "#EF4444", "#10B981",
  "#F59E0B", "#EC4899", "#6366F1",
];

function Confetti() {
  const [pieces, setPieces] = useState<
    { id: number; left: string; color: string; delay: string; size: number }[]
  >([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: `${Math.random() * 2}s`,
      size: Math.random() * 8 + 4,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </>
  );
}

export default function CompletePage() {
  const router = useRouter();
  const { name, reset } = useGameStore();

  useEffect(() => {
    if (!name) {
      router.replace("/");
    }
  }, [name, router]);

  const handleRestart = () => {
    reset();
    router.push("/");
  };

  if (!name) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in relative overflow-hidden">
      <Confetti />

      <div className="text-7xl mb-6">&#127881;</div>
      <h1 className="text-2xl font-extrabold text-gray-800 mb-3 text-center">
        고생하셨습니다!
      </h1>
      <p className="text-gray-500 text-center mb-2 text-base">
        <span className="font-bold text-violet-600">{name}</span>님의
        <br />
        직장 가치관이 기록되었습니다
      </p>
      <p className="text-gray-400 text-sm text-center mb-10">
        10가지 선택 모두 완료!
      </p>

      <button
        onClick={handleRestart}
        className="px-8 py-3 rounded-2xl bg-violet-500 text-white font-bold
                   hover:bg-violet-600 active:scale-[0.98] transition-all"
      >
        처음으로 돌아가기
      </button>
    </div>
  );
}
