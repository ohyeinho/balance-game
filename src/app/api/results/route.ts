import { NextRequest, NextResponse } from "next/server";
import { getAllResponses } from "@/lib/db";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "eunsun";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "잘못된 암호입니다" },
        { status: 401 }
      );
    }

    const responses = await getAllResponses();
    return NextResponse.json({ responses });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
