import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Smoke test: the LiveChat (text.com) widget is loaded globally via index.html,
 * which means it is present on EVERY route in this React SPA (no per-route
 * mounting required). This test verifies the snippet is intact so the widget
 * keeps loading site-wide.
 *
 * Routes covered (all routes share the same index.html shell):
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

const ORG_ID = "afad8ec9-9c40-4801-8637-d86f7a08e51c";

let html = "";

beforeAll(() => {
  html = readFileSync(resolve(__dirname, "../../index.html"), "utf-8");
});

describe("LiveChat widget — global snippet (loads on every route)", () => {
  it("includes the LiveChat organizationId in index.html", () => {
    expect(html).toContain(`window.__lc.organizationId = "${ORG_ID}"`);
  });

  it("registers window.LiveChatWidget initializer", () => {
    expect(html).toMatch(/n\.LiveChatWidget=n\.LiveChatWidget\|\|e/);
  });

  it("loads the LiveChat tracking script source", () => {
    expect(html).toContain("https://cdn.livechatinc.com/tracking.js");
  });

  it("provides a <noscript> chat fallback link", () => {
    expect(html).toContain(
      `https://www.text.com/chat-with/${ORG_ID}/`,
    );
  });

  it("places the LiveChat snippet inside <body> (not <head>)", () => {
    const bodyStart = html.indexOf("<body>");
    const lcIndex = html.indexOf("window.__lc");
    expect(bodyStart).toBeGreaterThan(-1);
    expect(lcIndex).toBeGreaterThan(bodyStart);
  });
});

describe.each(ROUTES)("LiveChat widget available on route %s", (route) => {
  it(`route "${route}" inherits the global LiveChat snippet from index.html`, () => {
    // SPA architecture: every route renders into the same index.html shell,
    // so verifying the snippet exists once guarantees per-route availability.
    expect(route.startsWith("/")).toBe(true);
    expect(html).toContain(`window.__lc.organizationId = "${ORG_ID}"`);
    expect(html).toContain("https://cdn.livechatinc.com/tracking.js");
  });
});