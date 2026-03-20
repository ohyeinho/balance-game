import { NextRequest, NextResponse } from "next/server";
import { getAllResponses, clearAllResponses, deleteResponseById } from "@/lib/db";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "eunsun";

export async function GET(request: NextRequest) {
  try {
    const entryCode = request.cookies.get('entryCode')?.value || '100830';
    const responses = await getAllResponses(entryCode);
    return NextResponse.json({ responses });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

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

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "잘못된 암호입니다" },
        { status: 401 }
      );
    }

    const { id } = body;
    if (id) {
      await deleteResponseById(id);
    } else {
      await clearAllResponses();
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
