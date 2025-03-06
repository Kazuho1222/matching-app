import { handlers } from "@/lib/auth";

// Edge Runtimeでの実行を回避する設定
export const runtime = "nodejs";

export const { GET, POST } = handlers;
