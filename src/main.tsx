import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Auto-recover from stale dynamic chunk errors after a deploy.
// When a previously-loaded index.js references a hashed chunk that no longer
// exists (because a new build replaced it), the dynamic import throws and the
// page goes blank. Force a one-time hard reload to fetch the new manifest.
const CHUNK_RELOAD_KEY = "__chunk_reload_attempted__";
function isChunkLoadError(err: unknown): boolean {
  const msg = (err as any)?.message || String(err || "");
  return (
    /Failed to fetch dynamically imported module/i.test(msg) ||
    /Importing a module script failed/i.test(msg) ||
    /ChunkLoadError/i.test(msg) ||
    /Loading chunk [\d]+ failed/i.test(msg)
  );
}
function maybeReloadForStaleChunk(err: unknown) {
  if (!isChunkLoadError(err)) return;
  try {
    if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) return;
    sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
  } catch {}
  window.location.reload();
}
window.addEventListener("error", (e) => maybeReloadForStaleChunk(e.error || e.message));
window.addEventListener("unhandledrejection", (e) => maybeReloadForStaleChunk(e.reason));
// Clear the guard on successful navigation so future stale chunks can recover too.
window.addEventListener("load", () => {
  setTimeout(() => {
    try { sessionStorage.removeItem(CHUNK_RELOAD_KEY); } catch {}
  }, 5000);
});

createRoot(document.getElementById("root")!).render(<App />);
