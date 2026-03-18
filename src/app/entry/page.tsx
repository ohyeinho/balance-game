"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EntryPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (trimmed === "웨파2603") {
      // Set a cookie (valid for 1 day)
      document.cookie = `entryCode=${encodeURIComponent(trimmed)}; path=/; max-age=86400; SameSite=Lax`;
      
      // Navigate to home page
      router.push("/");
    } else {
      setError("입장 코드가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
      <div className="text-6xl mb-4 text-violet-500">&#128274;</div>
      <h1 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
        입장 코드 확인
      </h1>
      <p className="text-gray-500 mb-10 text-center text-sm">
        이용하시려면 입장 코드를 입력해주세요.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="text"
          placeholder="입장 코드"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError("");
          }}
          className={`w-full px-5 py-4 text-lg rounded-2xl border-2 
                     focus:border-violet-400 focus:outline-none text-center
                     bg-white/80 backdrop-blur-sm transition-colors
                     ${error ? 'border-red-400' : 'border-gray-200'}
          `}
        />
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
        <button
          type="submit"
          disabled={!code.trim()}
          className="w-full mt-4 py-4 text-lg font-bold rounded-2xl
                     bg-violet-500 text-white
                     hover:bg-violet-600 active:scale-[0.98]
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     transition-all duration-200"
        >
          확인
        </button>
      </form>
    </div>
  );
}
