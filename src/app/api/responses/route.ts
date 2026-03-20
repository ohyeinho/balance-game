import { NextRequest, NextResponse } from "next/server";
import { saveResponse } from "@/lib/db";
import { TOTAL_QUESTIONS } from "@/lib/questions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, answers } = body;

    // Validate name
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.trim().length > 20) {
      return NextResponse.json(
        { error: "이름은 1-20자여야 합니다" },
        { status: 400 }
      );
    }

    // Validate answers
    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "답변이 필요합니다" },
        { status: 400 }
      );
    }

    for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
      const answer = answers[String(i)];
      if (answer !== "A" && answer !== "B") {
        return NextResponse.json(
          { error: `문항 ${i}의 답변이 유효하지 않습니다` },
          { status: 400 }
        );
      }
    }

    const entryCode = request.cookies.get('entryCode')?.value || '100830';
    const response = await saveResponse(name.trim(), answers, entryCode);
    return NextResponse.json({ success: true, id: response.id });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
