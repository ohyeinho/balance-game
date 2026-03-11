"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";

interface GameResponse {
  id: string;
  name: string;
  answers: Record<string, "A" | "B">;
  createdAt: string;
}

export default function ResultsPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [responses, setResponses] = useState<GameResponse[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!password.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "인증 실패");
        return;
      }

      const data = await res.json();
      setResponses(data.responses);
      setAuthenticated(true);
    } catch {
      setError("서버 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
        <div className="text-5xl mb-4">&#128274;</div>
        <h1 className="text-xl font-extrabold text-gray-800 mb-6">
          관리자 인증
        </h1>
        <div className="w-full max-w-xs">
          <input
            type="password"
            placeholder="암호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-5 py-4 text-lg rounded-2xl border-2 border-gray-200
                       focus:border-violet-400 focus:outline-none text-center
                       bg-white/80 backdrop-blur-sm transition-colors"
          />
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <button
            onClick={handleLogin}
            disabled={loading || !password.trim()}
            className="w-full mt-4 py-4 text-lg font-bold rounded-2xl
                       bg-violet-500 text-white
                       hover:bg-violet-600 active:scale-[0.98]
                       disabled:bg-gray-300 disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            {loading ? "확인 중..." : "확인"}
          </button>
        </div>
      </div>
    );
  }

  // Calculate stats per question
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

      <div className="space-y-4">
        {questions.map((q) => {
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
                  style={{ width: `${stats.aPercent || 1}%`, minWidth: stats.aCount > 0 ? '2rem' : '0' }}
                >
                  {stats.aPercent}%
                </div>
                <div
                  className="bg-orange-500 text-white flex items-center justify-center transition-all duration-500 rounded-r-xl"
                  style={{ width: `${stats.bPercent || 1}%`, minWidth: stats.bCount > 0 ? '2rem' : '0' }}
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

              {/* Individual responses */}
              <div className="flex flex-wrap gap-1">
                {responses.map((r) => {
                  const choice = r.answers[String(q.id)];
                  return (
                    <span
                      key={r.id}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        choice === "A"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {r.name}: {choice}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 mb-8 text-center text-xs text-gray-300">
        Balance Game Admin
      </div>
    </div>
  );
}
