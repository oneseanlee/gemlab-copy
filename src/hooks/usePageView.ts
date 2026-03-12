import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

function getVisitorId(): string {
  const key = "b365_vid";
  let vid = localStorage.getItem(key);
  if (!vid) {
    vid = crypto.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(key, vid);
  }
  return vid;
}

export function usePageView() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Skip admin routes and preview/dev environments
    if (pathname.startsWith("/admin")) return;
    const host = window.location.hostname;
    if (host.includes("preview") || host.includes("localhost") || host.includes("127.0.0.1")) return;

    const visitorId = getVisitorId();

    supabase
      .from("page_views" as any)
      .insert({ page_path: pathname, visitor_id: visitorId } as any)
      .then(({ error }) => {
        if (error) console.warn("[PageView] insert error:", error.message);
      });
  }, [pathname]);
}
