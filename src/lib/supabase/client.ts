import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

/**
 * 브라우저(CSR) 전용 Supabase 클라이언트 싱글턴.
 * anon 키는 공개되어도 되는 키이며, 실제 접근 제어는 RLS 정책으로 한다.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase 환경변수가 없습니다. .env.local에 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정해 주세요.",
    );
  }

  browserClient = createClient(url, anonKey, {
    auth: { persistSession: false },
  });
  return browserClient;
}
