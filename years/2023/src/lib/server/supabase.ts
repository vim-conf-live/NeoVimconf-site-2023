import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { AstroCookies } from "astro";

export const createSBSSR = ({ cookies }: { cookies: AstroCookies }) => {
  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_KEY,
    {
      cookies: {
        get(key: string) {
          return cookies.get(key)?.value;
        },
        set(key: string, value: string, options: CookieOptions) {
          cookies.set(key, value, options);
        },
        remove(key: string, options) {
          cookies.delete(key, options);
        },
      },
    },
  );
}
