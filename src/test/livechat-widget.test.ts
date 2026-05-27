import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Smoke test: the expired LiveChat (text.com) widget must not be loaded globally.
 * The third-party script throws "License expired" and surfaces as opaque
 * browser "Script error." events that can trip blank-screen detection.
 */
const ROUTES = [
  "/",
  "/article",
  "/tprime365",
  "/tprime365-article",
  "/glp1-article",
  "/glp1-buy",
  "/tprime-buy",
  "/glp1-protocol",
  "/nhto",
  "/nhto-intake",
  "/tprime365-intake",
  "/ucos",
  "/glp1-ucos",
  "/privacy",
  "/terms",
  "/returns",
  "/partners",
  "/guides",
  "/free-testosterone-guide",
  "/free-testosterone-guide/upgrade",
  "/free-testosterone-guide/thank-you",
  "/checkout",
  "/t-score-quiz",
  "/book",
  "/admin",
  "/this-route-does-not-exist",
];

const EXPIRED_ORG_ID = "afad8ec9-9c40-4801-8637-d86f7a08e51c";

let html = "";

beforeAll(() => {
  html = readFileSync(resolve(__dirname, "../../index.html"), "utf-8");
});

describe("LiveChat widget — disabled expired global snippet", () => {
  it("does not include the expired LiveChat organizationId in index.html", () => {
    expect(html).not.toContain(`window.__lc.organizationId = "${EXPIRED_ORG_ID}"`);
  });

  it("does not register the LiveChatWidget initializer", () => {
    expect(html).not.toMatch(/n\.LiveChatWidget=n\.LiveChatWidget\|\|e/);
  });

  it("does not load the expired LiveChat tracking script source", () => {
    expect(html).not.toContain("https://cdn.livechatinc.com/tracking.js");
  });
});

describe.each(ROUTES)("LiveChat widget available on route %s", (route) => {
  it(`route "${route}" does not inherit the expired global LiveChat snippet`, () => {
    // SPA architecture: every route renders into the same index.html shell,
    // so verifying the snippet is absent once guarantees it is absent per-route.
    expect(route.startsWith("/")).toBe(true);
    expect(html).not.toContain(`window.__lc.organizationId = "${EXPIRED_ORG_ID}"`);
    expect(html).not.toContain("https://cdn.livechatinc.com/tracking.js");
  });
});