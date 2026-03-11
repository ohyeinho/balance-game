export interface GameResponse {
  id: string;
  name: string;
  answers: Record<string, "A" | "B">;
  createdAt: string;
}

// In-memory fallback for local development (no KV setup needed)
const inMemoryStore: GameResponse[] = [];

function useKV(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function saveResponse(
  name: string,
  answers: Record<string, "A" | "B">
): Promise<GameResponse> {
  const response: GameResponse = {
    id: crypto.randomUUID(),
    name,
    answers,
    createdAt: new Date().toISOString(),
  };

  if (useKV()) {
    const { kv } = await import("@vercel/kv");
    await kv.rpush("balance-game:responses", JSON.stringify(response));
  } else {
    inMemoryStore.push(response);
  }

  return response;
}

export async function getAllResponses(): Promise<GameResponse[]> {
  if (useKV()) {
    const { kv } = await import("@vercel/kv");
    const raw = await kv.lrange("balance-game:responses", 0, -1);
    return raw.map((item) =>
      typeof item === "string" ? JSON.parse(item) : (item as GameResponse)
    );
  }

  return [...inMemoryStore];
}
