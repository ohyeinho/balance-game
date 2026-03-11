"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { questions, categories, TOTAL_QUESTIONS } from "@/lib/questions";

interface GameResponse {
  id: string;
  name: string;
  answers: Record<string, "A" | "B">;
  createdAt: string;
}

export default function ResultsPage() {
  const [responses, setResponses] = useState<GameResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch("/api/results");
        if (!res.ok) {
          setError("데이터를 불러올 수 없습니다");
          return;
        }
        const data = await res.json();
        setResponses(data.responses);
      } catch {
        setError("서버 오류가 발생했습니다");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-sm">불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  // Calculate best matching couples
  const getMatchingCouples = () => {
    if (responses.length < 2) return [];

    const pairs: { nameA: string; nameB: string; matches: number }[] = [];
    for (let i = 0; i < responses.length; i++) {
      for (let j = i + 1; j < responses.length; j++) {
        let matches = 0;
        for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
          if (responses[i].answers[String(q)] === responses[j].answers[String(q)]) {
            matches++;
          }
        }
        pairs.push({
          nameA: responses[i].name,
          nameB: responses[j].name,
          matches,
        });
      }
    }
    pairs.sort((a, b) => b.matches - a.matches);
    return pairs.slice(0, 3);
  };

  const topCouples = getMatchingCouples();
  const medalColors = [
    "from-yellow-400 to-amber-500",
    "from-gray-300 to-gray-400",
    "from-amber-600 to-amber-700",
  ];
  const medalEmojis = ["\uD83E\uDD47", "\uD83E\uDD48", "\uD83E\uDD49"];

  const getStats = (qId: number) => {
    let aCount = 0;
    let bCount = 0;
    responses.forEach((r) => {
      if (r.answers[String(qId)] === "A") aCount++;
      else if (r.answers[String(qId)] === "B") bCount++;
    });
    const total = aCount + bCount;
    return {
      aCount,
      bCount,
      aPercent: total > 0 ? Math.round((aCount / total) * 100) : 0,
      bPercent: total > 0 ? Math.round((bCount / total) * 100) : 0,
    };
  };

  return (
    <div className="min-h-screen px-4 py-6 animate-fade-in">
      <h1 className="text-xl font-extrabold text-gray-800 mb-1 text-center">
        응답 결과
      </h1>
      <p className="text-sm text-gray-400 text-center mb-6">
        총 {responses.length}명 참여
      </p>

      {/* Best Matching Couples */}
      {topCouples.length > 0 && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 mb-6">
          <h2 className="text-base font-extrabold text-gray-800 mb-1 text-center">
            Best Matching Couples
          </h2>
          <p className="text-xs text-gray-400 text-center mb-4">
            답변이 가장 많이 일치하는 조합
          </p>
          <div className="space-y-3">
            {topCouples.map((couple, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  idx === 0 ? "bg-amber-50 border border-amber-200" : "bg-gray-50"
                }`}
              >
                <span className="text-2xl">{medalEmojis[idx]}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-800 truncate">
                    {couple.nameA} & {couple.nameB}
                  </p>
                  <p className="text-xs text-gray-400">
                    {TOTAL_QUESTIONS}문제 중 {couple.matches}개 일치
                  </p>
                </div>
                <div
                  className={`text-white text-xs font-extrabold px-3 py-1.5 rounded-full bg-gradient-to-r ${medalColors[idx]}`}
                >
                  {Math.round((couple.matches / TOTAL_QUESTIONS) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Participants list */}
      {responses.length > 0 && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 mb-6">
          <h2 className="text-base font-extrabold text-gray-800 mb-3 text-center">
            참여자 목록
          </h2>
          <div className="space-y-2">
            {responses.map((r) => (
              <div
                key={r.id}
                className="flex items-center p-3 bg-gray-50 rounded-xl"
              >
                <span className="font-bold text-sm text-gray-800">{r.name}</span>
                <span className="text-xs text-gray-400 ml-2">
                  {new Date(r.createdAt).toLocaleDateString("ko-KR", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Questions by category */}
      {categories.map((cat) => {
        const categoryQuestions = questions.filter((q) => q.category === cat.id);
        return (
          <div key={cat.id} className="mb-8">
            {/* Category header */}
            <div className="flex items-center gap-2 mb-4 mt-2">
              <span className="text-2xl">{cat.emoji}</span>
              <div>
                <h2 className="text-base font-extrabold text-gray-800">
                  {cat.title}
                </h2>
                <p className="text-xs text-gray-400">{cat.subtitle}</p>
              </div>
            </div>

            <div className="space-y-4">
              {categoryQuestions.map((q) => {
                const stats = getStats(q.id);
                return (
                  <div
                    key={q.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100"
                  >
                    <p className="text-xs text-gray-400 font-bold mb-2">
                      Q{q.id}.
                    </p>

                    {/* Stats bar */}
                    <div className="flex gap-1 mb-3 h-8 rounded-xl overflow-hidden text-xs font-bold">
                      <div
                        className="bg-blue-500 text-white flex items-center justify-center transition-all duration-500 rounded-l-xl"
                        style={{
                          width: `${stats.aPercent || 1}%`,
                          minWidth: stats.aCount > 0 ? "2rem" : "0",
                        }}
                      >
                        {stats.aPercent}%
                      </div>
                      <div
                        className="bg-orange-500 text-white flex items-center justify-center transition-all duration-500 rounded-r-xl"
                        style={{
                          width: `${stats.bPercent || 1}%`,
                          minWidth: stats.bCount > 0 ? "2rem" : "0",
                        }}
                      >
                        {stats.bPercent}%
                      </div>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="bg-blue-50 rounded-xl p-2">
                        <span className="font-bold text-blue-600">A.</span>{" "}
                        <span className="text-gray-600">{q.optionA}</span>
                      </div>
                      <div className="bg-orange-50 rounded-xl p-2">
                        <span className="font-bold text-orange-600">B.</span>{" "}
                        <span className="text-gray-600">{q.optionB}</span>
                      </div>
                    </div>

                    {/* Individual responses - A vs B split */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="space-y-1">
                        <p className="font-bold text-blue-500 text-center mb-1.5">
                          A ({stats.aCount}명)
                        </p>
                        {responses
                          .filter((r) => r.answers[String(q.id)] === "A")
                          .map((r) => (
                            <div
                              key={r.id}
                              className="bg-blue-50 text-blue-700 font-medium px-2.5 py-1.5 rounded-lg text-center"
                            >
                              {r.name}
                            </div>
                          ))}
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-orange-500 text-center mb-1.5">
                          B ({stats.bCount}명)
                        </p>
                        {responses
                          .filter((r) => r.answers[String(q.id)] === "B")
                          .map((r) => (
                            <div
                              key={r.id}
                              className="bg-orange-50 text-orange-700 font-medium px-2.5 py-1.5 rounded-lg text-center"
                            >
                              {r.name}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Admin link */}
      <div className="mt-4 mb-8 flex justify-center">
        <Link href="/admin" className="text-xs text-gray-300 hover:text-gray-400 transition-colors">
          관리자 설정
        </Link>
      </div>
    </div>
  );
}
