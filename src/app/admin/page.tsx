"use client";

import { useState } from "react";
import Link from "next/link";

interface GameResponse {
  id: string;
  name: string;
  answers: Record<string, "A" | "B">;
  createdAt: string;
  entryCode?: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [responses, setResponses] = useState<GameResponse[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Tabs / swipeable state
  const codes = ["100830", "아콩이콩", "삼성"];
  const [activeCode, setActiveCode] = useState("100830");

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (codes[index] && codes[index] !== activeCode) {
      setActiveCode(codes[index]);
    }
  };

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

  const handleDeleteOne = async (id: string, name: string) => {
    if (!window.confirm(`"${name}"님의 응답을 삭제하시겠습니까?`)) return;

    try {
      const res = await fetch("/api/results", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, id }),
      });

      if (res.ok) {
        setResponses((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch {
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        "정말로 모든 응답 데이터를 초기화하시겠습니까?\n이 작업은 되돌릴 수 없습니다."
      )
    ) {
      return;
    }
    if (!window.confirm("마지막 확인입니다. 정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const res = await fetch("/api/results", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setResponses([]);
        alert("데이터가 초기화되었습니다.");
      } else {
        alert("초기화에 실패했습니다.");
      }
    } catch {
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 animate-fade-in flex flex-col">
      <h1 className="text-xl font-extrabold text-gray-800 mb-1 text-center">
        관리자 설정
      </h1>
      <p className="text-sm text-gray-400 text-center mb-6">
        총 {responses.length}명 참여
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-4 px-2">
        {codes.map((code) => (
          <button
            key={code}
            onClick={() => {
              setActiveCode(code);
              document.getElementById(`slide-${code}`)?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              activeCode === code
                ? "bg-violet-500 text-white shadow-md"
                : "bg-white/80 text-gray-500 hover:bg-gray-100"
            }`}
          >
            {code}
          </button>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Swipeable Container */}
      <div 
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar mb-6 -mx-4 px-4 pb-4"
        onScroll={handleScroll}
      >
        {codes.map((code) => {
          // Fallback to "100830" if r.entryCode is undefined for older data
          const groupResponses = responses.filter(
            (r) => (r.entryCode || "100830") === code
          );
          
          return (
            <div key={code} id={`slide-${code}`} className="w-full shrink-0 snap-center px-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 h-full min-h-[300px]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-extrabold text-gray-800">
                    참여자 목록 ({code})
                  </h2>
                  <span className="text-xs font-bold bg-violet-100 text-violet-600 px-2 py-1 rounded-lg">
                    {groupResponses.length}명
                  </span>
                </div>
                
                {groupResponses.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">
                    이 코드로 참여한 사람이 없습니다.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {groupResponses.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="min-w-0">
                          <span className="font-bold text-sm text-gray-800">
                            {r.name}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            {new Date(r.createdAt).toLocaleDateString("ko-KR", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteOne(r.id, r.name)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-red-100 text-red-600
                                     hover:bg-red-200 active:scale-[0.95] transition-all font-medium shrink-0 ml-2"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset button */}
      <div className="mb-8 flex flex-col items-center gap-4">
        <button
          onClick={handleReset}
          className="px-6 py-3 text-sm font-bold rounded-2xl
                     bg-red-500 text-white
                     hover:bg-red-600 active:scale-[0.98]
                     transition-all duration-200"
        >
          데이터 초기화
        </button>
        <Link
          href="/results"
          className="text-sm font-bold text-violet-500 hover:text-violet-600 transition-colors"
        >
          결과 보기 →
        </Link>
      </div>
    </div>
  );
}
