/**
 * Centralized JSON-LD schema objects for SEO.
 * Content pulled verbatim from existing page components / company info.
 */

const BASE = "https://cell365power.com";
const LOGO = "https://cell365power.com/images/best365labs-logo.png";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "HealthAndBeautyBusiness"],
  name: "Best 365 Labs, Inc.",
  url: BASE,
  logo: LOGO,
  telephone: "(385) 421-5651",
  email: "info@best365labs.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "14857 S Concorde Park Dr",
    addressLocality: "Bluffdale",
    addressRegion: "UT",
    postalCode: "84065",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.facebook.com/Best365Labs",
    "https://www.instagram.com/best365labs/",
    "https://www.youtube.com/channel/UCZpFZ__arXCIsboHoRAMQWw",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Best 365 Labs",
  url: BASE,
};

export const tprime365ProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "TPrime365™",
  description:
    "4-in-1 sublingual testosterone optimizer. Boosts T-levels 60–664% without injections or shutdown.",
  brand: { "@type": "Brand", name: "Best 365 Labs" },
  offers: {
    "@type": "Offer",
    price: "149.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
    url: `${BASE}/tprime365`,
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "94" },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Brett Earnshaw" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "Testosterone went from 658 to 749 in two months. More energy, sharper focus, better performance.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ernesto Cruz" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "Better focus, better sleep, better everything.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Jay Atkins" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "Wish I started this years ago.",
    },
  ],
};

export const glp1ProtocolProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GLP-1 Optimization Protocol",
  description:
    "Preserve muscle and energy during GLP-1 weight loss therapy. 72% more lean mass preserved vs GLP-1 alone.",
  brand: { "@type": "Brand", name: "Best 365 Labs" },
  offers: {
    "@type": "Offer",
    price: "39.95",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
    url: `${BASE}/glp1-protocol`,
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
};

export const ucosProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Ultimate Cellular Optimization System",
  description:
    "24-hour energy, focus, and longevity optimization — morning to night. Activate365, Mito365, and Restore365 with MODS Max™ 10x absorption.",
  brand: { "@type": "Brand", name: "Best 365 Labs" },
  offers: {
    "@type": "Offer",
    price: "175.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
    url: `${BASE}/ucos`,
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Brett Earnshaw" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "My testosterone went from 658 to 749 in two months—more energy, sharper focus, better performance. This system changed my life.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Mike VanDyke" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "I experienced rapid improvements in energy and cellular performance. It's a game-changer for anyone serious about health.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Whitney Lopez" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "As a busy professional, the system gave me noticeable improvements in energy and focus—plus, I trust the science behind it.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Jordan Sides" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "I wanted real results and evidence. This program delivered both—better wellness, sharper mind, and research I could be part of every step.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Maryanne Van Dyke" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "The Cellular Optimization System helped me level up my health and share authentic results with my audience—real energy, real confidence, every day.",
    },
  ],
};

export const glp1ActivateProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GLP-1 Activate",
  description:
    "Sublingual cellular support designed specifically for GLP-1 therapy. Bypasses the gut, powers the burn, protects what GLP-1 strips away.",
  brand: { "@type": "Brand", name: "Best 365 Labs" },
  offers: {
    "@type": "Offer",
    price: "27.00",
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
    priceValidUntil: "2026-12-31",
    url: `${BASE}/glp1-activate`,
  },
};

export const glp1UcosProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GLP-1 Cellular Bundle",
  description:
    "Complete 24-hour cellular optimization — 4 products working together for maximum results. Includes Activate365, Mito365, Restore365, and Metabolism+.",
  brand: { "@type": "Brand", name: "Best 365 Labs" },
  offers: {
    "@type": "Offer",
    price: "175.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
    url: `${BASE}/glp1-ucos`,
  },
};

export const nhtoProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Non-Hormonal Testosterone Bundle",
  description:
    "Maximum cellular and hormonal synergy — prescription-grade sublingual Enclomiphene formula plus complete 3-product cellular optimization stack.",
  brand: { "@type": "Brand", name: "Best 365 Labs" },
  offers: {
    "@type": "Offer",
    price: "250.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
    url: `${BASE}/nhto`,
  },
};

/* ── FAQ Page schemas ───────────────────────────────────────── */

const faqPage = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const tprime365FaqSchema = faqPage([
  { q: "How is this different from TRT injections?", a: "TPrime365 stimulates your NATURAL testosterone production through the HPG axis. TRT shuts down your natural production, causes testicular atrophy, and eliminates fertility. TPrime365 preserves all of that while optimizing your levels." },
  { q: "What happens if I'm not approved?", a: "If the independent physician determines TPrime365 isn't right for you based on your health assessment, you'll be notified promptly. The intake process is free — you only move forward if you qualify." },
  { q: "Will I lose my gains if I stop?", a: "No. Because TPrime365 works with your natural system (not replacing it), you can discontinue without major withdrawal effects. Your body continues producing testosterone naturally." },
  { q: "How long until I see results?", a: "Most men notice improvements in energy and mood within 2 weeks. Testosterone levels typically increase 60-664% within 2-4 weeks. Full benefits develop over 8-12 weeks." },
  { q: "Do I need blood work?", a: "The physician may recommend baseline testosterone levels, but it's not always required for approval. Many men proceed based on symptoms alone." },
  { q: "Is this subscription-based?", a: "Yes, TPrime365 is a monthly subscription. You can pause or cancel anytime, though we recommend at least 3 months for optimal results." },
  { q: "Can I take this with other supplements?", a: "TPrime365 is designed as a complete system. The reviewing physician will evaluate any other medications or supplements you're taking during the approval process." },
]);

export const glp1ProtocolFaqSchema = faqPage([
  { q: "Is this safe to take with GLP-1 medications?", a: "Yes. Triple Power Methylene Blue and Metabolism+ are dietary supplements designed to complement GLP-1 therapy. They work alongside your medication by supporting the mitochondrial systems that GLP-1 doesn't address. Always inform your prescribing physician of all supplements you're taking." },
  { q: "When should I start this protocol?", a: "Ideally, start from Day 1 of your GLP-1 therapy. The first 30 days set the metabolic pattern for your entire weight loss journey. However, starting at any point during GLP-1 therapy will still provide significant benefits." },
  { q: "What's included in the protocol?", a: "You receive Triple Power Methylene Blue (30-day sublingual supply with USP Methylene Blue 150mg, NAD+ 600mg, and Spermidine 300mg), Metabolism+ tablets (60 tablets for 30 days), a complete Protocol Guide with timing and meal suggestions, and FREE shipping." },
  { q: "How quickly will I notice results?", a: "Most users report improved energy within 3-5 days. Mental clarity improvements are typically noticed within the first week. Measurable differences in body composition and metabolic markers are usually apparent within 2-4 weeks of consistent use." },
  { q: "What if I stop taking GLP-1?", a: "This protocol is especially valuable when transitioning off GLP-1. By supporting your mitochondria and metabolism throughout your GLP-1 journey, you're building the metabolic foundation needed to maintain your weight loss long-term — addressing the #1 problem with GLP-1 therapy." },
  { q: "How is this shipped?", a: "Orders ship within 24-48 hours via USPS Priority Mail. You'll receive tracking information via email. All packages arrive in discreet packaging. Shipping is always FREE." },
  { q: "Is there a subscription?", a: "This is a one-time purchase of a 30-day protocol. No subscriptions, no auto-renewals, no hidden charges. Reorder when you're ready." },
  { q: "Do I need a prescription?", a: "No. Triple Power and Metabolism+ are dietary supplements and do not require a prescription. They are manufactured in an FDA-registered facility with third-party testing for purity and potency." },
]);

export const glp1BuyFaqSchema = faqPage([
  { q: "What exactly is in the protocol?", a: "You receive two precision-formulated products: Triple Power Methylene Blue (sublingual drops) and Metabolism+ Tablets. Together they activate three longevity pathways — AMPK, Sirtuins, and Autophagy — to protect your metabolism, preserve lean muscle, and eliminate energy crashes while on GLP-1 medications." },
  { q: "Will this work if I'm on Ozempic, Mounjaro, or Wegovy?", a: "Yes — the protocol is specifically designed to complement GLP-1 receptor agonists. The ingredients are non-pharmaceutical and don't interfere with your medication. Many of our customers use it alongside their prescribed GLP-1 treatment to optimize their results." },
  { q: "How fast will I see results?", a: "Most users report noticeable improvements in energy and mental clarity within the first 5–7 days. Measurable metabolic and body composition improvements typically appear by weeks 2–3. Full protocol benefits compound over the complete 30-day cycle." },
  { q: "What if it doesn't work for me?", a: "You're covered by our 30-day, 100% money-back guarantee. If you're not thrilled with your results for any reason, simply contact us and we'll refund every penny — no questions asked, no hoops to jump through." },
  { q: "Is this a subscription?", a: "No — this is a one-time purchase. You'll receive a complete 30-day supply with no recurring charges, no auto-ship, and no hidden fees. If you love the results (and we think you will), you can reorder anytime." },
]);

export const ucosFaqSchema = faqPage([
  { q: "How does the 24-hour cellular optimization system work?", a: "The system uses three precision-timed supplements: Activate365 in the morning to prime your cells with spermidine, NAD+, and boron; Mito365 at midday to supercharge mitochondrial function with Methylene Blue, PQQ, and NAD+; and Restore365 in the evening to optimize deep sleep and overnight recovery with melatonin, GABA, and boron. Together, they create a complete 24-hour optimization cycle." },
  { q: "What makes this different from taking individual supplements?", a: "Individual supplements lack coordination and timing. Our system is precisely engineered so each formula amplifies the others — morning activation feeds into midday energy production, which feeds into evening recovery. The cumulative synergy delivers results that individual supplements simply cannot match. Plus, our MODS Max™ delivery technology provides up to 10x enhanced absorption." },
  { q: "Are the ingredients safe and third-party tested?", a: "Yes. All products are manufactured in FDA-registered, cGMP-certified facilities in the USA. Every batch is third-party tested for purity and potency. Important: Methylene Blue (in Mito365) should NOT be used by patients with G6PD deficiency or those taking MAOIs/SSRIs." },
  { q: "How quickly will I see results with the cellular system?", a: "Many users report noticeable improvements in energy and focus within the first 1-2 weeks. Sleep quality improvements with Restore365 are often noticed within the first few nights. Full systemic benefits typically develop over 4-8 weeks of consistent use." },
  { q: "What is MODS Max™ delivery technology?", a: "MODS Max™ (Microdose Optimized Delivery System) is our patent-pending sublingual delivery technology. It uses microdose reactive oxygen species to briefly open mucosal barriers, enabling direct bloodstream absorption that bypasses the digestive system. This results in up to 10x enhanced bioavailability compared to standard oral supplements." },
  { q: "How do I contact 365 Labs for support?", a: "You can reach our support team by phone at (385) 421-5651 or by email at info@best365labs.com. Our team is available to answer any questions about the system, ingredients, or your order." },
]);

export const glp1ActivateFaqSchema = faqPage([
  { q: "How is this different from other NAD+ supplements?", a: "Most NAD+ products use precursors (NR, NMN) and rely on your body to convert them — a process GLP-1 medications can disrupt by slowing digestion. GLP-1 Activate delivers actual NAD+ molecules sublingually, then uses 1-MNA to prevent breakdown. Faster onset, longer duration, no gut required." },
  { q: "Will this interfere with my Ozempic®, Wegovy®, Mounjaro®, or Zepbound®?", a: "No. Sublingual absorption bypasses the digestive system entirely, which is exactly the system your GLP-1 medication has slowed. There is zero pharmacokinetic interference." },
  { q: "When will it ship?", a: "Preorders ship May 1, 2026. Subscription billing begins on your first shipment." },
  { q: "Can I cancel my subscription?", a: "Yes. Pause, skip, or cancel anytime from your account." },
  { q: "Do I need a prescription?", a: "No. GLP-1 Activate is a dietary supplement manufactured in an FDA-registered facility. No prescription needed." },
  { q: "Is this safe with my GLP-1 medication?", a: "Yes — designed specifically to complement GLP-1 therapy. Always inform your prescribing physician of any supplements you take." },
  { q: "How quickly will I notice results?", a: "Most users report energy improvements within 3–7 days. Cellular benefits compound over 4–8 weeks of consistent daily use." },
]);

export const tprimeAdvertorialFaqSchema = faqPage([
  { q: "How is TPrime365 different from TRT?", a: "TRT replaces your body's testosterone production — once you start, your body stops making its own. TPrime365 does the opposite. It signals your body to produce more testosterone naturally. You keep your fertility, avoid testicular atrophy, and can stop anytime without crashing." },
  { q: "What if I'm not approved by the physician?", a: "If the reviewing physician determines you are not a candidate for TPrime365, the $140 consultation fee is fully refunded. No questions asked." },
  { q: "When do I pay?", a: "You pay $149 when you place your order. This covers your first month's supply plus the physician consultation. If you're not approved, you receive a full refund." },
  { q: "Will I lose my gains if I stop?", a: "Because TPrime365 supports your body's own production rather than replacing it, most men retain their gains after stopping. Your body doesn't become dependent on external hormones." },
  { q: "How long until I see results?", a: "Most men report noticeable improvements in energy, mood, and drive within 2-4 weeks. Blood work typically shows significant testosterone increases within the same timeframe." },
  { q: "Do I need blood work?", a: "Blood work is not required to start but is recommended. Many men get baseline labs before starting and follow-up labs at 4-6 weeks to track their progress." },
  { q: "Is this a subscription?", a: "Yes, TPrime365 ships monthly. But there are no contracts and no commitments — you can cancel anytime with no penalties or fees." },
  { q: "Can I take this with other supplements?", a: "Yes. TPrime365 is compatible with most supplements. However, if you're currently on TRT or any prescription medication, the reviewing physician will evaluate compatibility during your consultation." },
]);