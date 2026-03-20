import fs from "fs";
import path from "path";

export interface GameResponse {
  id: string;
  name: string;
  answers: Record<string, "A" | "B">;
  createdAt: string;
  entryCode?: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "responses.json");

function useKV(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// File-based storage for local development
function readFromFile(): GameResponse[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeToFile(responses: GameResponse[]) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(responses, null, 2), "utf-8");
}

export async function saveResponse(
  name: string,
  answers: Record<string, "A" | "B">,
  entryCode: string
): Promise<GameResponse> {
  const response: GameResponse = {
    id: crypto.randomUUID(),
    name,
    answers,
    createdAt: new Date().toISOString(),
    entryCode,
  };

  if (useKV()) {
    const { kv } = await import("@vercel/kv");
    await kv.rpush("balance-game:responses", JSON.stringify(response));
  } else {
    const all = readFromFile();
    all.push(response);
    writeToFile(all);
  }

  return response;
}

export async function getAllResponses(filterEntryCode?: string): Promise<GameResponse[]> {
  let all: GameResponse[] = [];
  if (useKV()) {
    const { kv } = await import("@vercel/kv");
    const raw = await kv.lrange("balance-game:responses", 0, -1);
    all = raw.map((item) =>
      typeof item === "string" ? JSON.parse(item) : (item as GameResponse)
    );
  } else {
    all = readFromFile();
  }

  // default to 100830 if entryCode is missing for backwards compat
  all = all.map(r => ({ ...r, entryCode: r.entryCode || '100830' }));

  if (filterEntryCode) {
    all = all.filter(r => r.entryCode === filterEntryCode);
  }

  return all;
}

export async function deleteResponseById(id: string): Promise<void> {
  if (useKV()) {
    const { kv } = await import("@vercel/kv");
    const all = await getAllResponses();
    await kv.del("balance-game:responses");
    const filtered = all.filter((r) => r.id !== id);
    for (const r of filtered) {
      await kv.rpush("balance-game:responses", JSON.stringify(r));
    }
  } else {
    const all = readFromFile();
    writeToFile(all.filter((r) => r.id !== id));
  }
}

export async function clearAllResponses(): Promise<void> {
  if (useKV()) {
    const { kv } = await import("@vercel/kv");
    await kv.del("balance-game:responses");
  } else {
    writeToFile([]);
  }
}

export async function clearResponsesByCode(entryCode: string): Promise<void> {
  const all = await getAllResponses();
  const filtered = all.filter((r) => r.entryCode !== entryCode);
  
  if (useKV()) {
    const { kv } = await import("@vercel/kv");
    await kv.del("balance-game:responses");
    for (const r of filtered) {
      await kv.rpush("balance-game:responses", JSON.stringify(r));
    }
  } else {
    writeToFile(filtered);
  }
}
