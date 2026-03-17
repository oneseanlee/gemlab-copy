import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import "./AdminDashboardPage.css";

// Pacific Time utilities — all dates/times displayed in PT
const PT_TZ = "America/Los_Angeles";
const toPTDate = (utc: string) => new Date(utc).toLocaleDateString("en-CA", { timeZone: PT_TZ }); // YYYY-MM-DD
const toPTDisplay = (utc: string) => new Date(utc).toLocaleDateString("en-US", { timeZone: PT_TZ });
const toPTTime = (utc: string) => new Date(utc).toLocaleTimeString("en-US", { timeZone: PT_TZ, hour: "2-digit", minute: "2-digit" });
const toPTFull = (utc: string) => new Date(utc).toLocaleString("en-US", { timeZone: PT_TZ });

interface Lead {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  cart_items: any;
  cart_total: number;
  completed: boolean;
  created_at: string;
  source?: string;
  utm_params?: Record<string, string>;
}

interface IntakeLead {
  id: string;
  first_name: string;
  email: string;
  phone: string | null;
  source: string;
  created_at: string;
  utm_params?: Record<string, string>;
  happymd_completed?: boolean;
  happymd_completed_at?: string | null;
}

interface FallbackCompletion {
  source: string;
  tracking_code: string;
  created_at: string;
}

interface TrafficData {
  totalPageViews: number;
  uniqueVisitors: number;
  dailyTraffic: { date: string; views: number; unique: number }[];
  topPages: { page: string; views: number; unique: number }[];
}

interface DailyBreakdown {
  date: string;
  leads: number;
  sales: number;
  abandoned: number;
  revenue: number;
  conversionRate: number;
  views: number;
  unique: number;
  intakeLeads: number;
  intakeCompleted: number;
}

export default function AdminDashboardPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("admin_token"));
  const [leads, setLeads] = useState<Lead[]>([]);
  const [intakeLeads, setIntakeLeads] = useState<IntakeLead[]>([]);
  const [fallbackCompletions, setFallbackCompletions] = useState<FallbackCompletion[]>([]);
  const [traffic, setTraffic] = useState<TrafficData>({ totalPageViews: 0, uniqueVisitors: 0, dailyTraffic: [], topPages: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"checkout" | "intake">("checkout");

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "abandoned">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const token = sessionStorage.getItem("admin_token") || "";

  const isLive = window.location.hostname === "cell365power.lovable.app";

  const fetchData = useCallback(async (t: string) => {
    setLoading(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "admin-dashboard-data",
        { headers: { Authorization: `Bearer ${t}` } }
      );
      if (fnError) throw fnError;
      if (data?.error === "Unauthorized") {
        sessionStorage.removeItem("admin_token");
        setAuthed(false);
        setError("Invalid password");
        return;
      }
      if (data?.error) throw new Error(data.error);
      setLeads(data.leads || []);
      setIntakeLeads(data.intakeLeads || []);
      setFallbackCompletions(data.fallbackCompletions || []);
      setTraffic(data.traffic || { totalPageViews: 0, uniqueVisitors: 0, dailyTraffic: [], topPages: [] });
    } catch (e: any) {
      setError(e.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = () => {
    if (!password.trim()) return;
    sessionStorage.setItem("admin_token", password);
    setAuthed(true);
    fetchData(password);
  };

  useEffect(() => {
    if (authed && token) fetchData(token);
  }, [authed, token, fetchData]);

  // Filtered checkout leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter === "completed" && !l.completed) return false;
      if (statusFilter === "abandoned" && l.completed) return false;
      if (search) {
        const q = search.toLowerCase();
        const match =
          l.first_name.toLowerCase().includes(q) ||
          (l.last_name || "").toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.phone || "").includes(q);
        if (!match) return false;
      }
      const ptDate = toPTDate(l.created_at);
      if (dateFrom && ptDate < dateFrom) return false;
      if (dateTo && ptDate > dateTo) return false;
      return true;
    });
  }, [leads, search, statusFilter, dateFrom, dateTo]);

  // Filtered intake leads
  const filteredIntakeLeads = useMemo(() => {
    return intakeLeads.filter((l) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          l.first_name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.phone || "").includes(q) ||
          l.source.toLowerCase().includes(q);
        if (!match) return false;
      }
      const ptDate = toPTDate(l.created_at);
      if (dateFrom && ptDate < dateFrom) return false;
      if (dateTo && ptDate > dateTo) return false;
      return true;
    });
  }, [intakeLeads, search, dateFrom, dateTo]);

  // Stats from ALL leads (unfiltered)
  const stats = useMemo(() => {
    const total = leads.length;
    const sales = leads.filter((l) => l.completed).length;
    const abandoned = total - sales;
    const rate = total > 0 ? ((sales / total) * 100).toFixed(1) : "0.0";
    const revenue = leads
      .filter((l) => l.completed)
      .reduce((sum, l) => sum + Number(l.cart_total), 0);
    const totalAllLeads = total + intakeLeads.length;
    return { total, sales, abandoned, rate, revenue, totalAllLeads };
  }, [leads, intakeLeads]);

  // Intake leads by source
  const intakeBySource = useMemo(() => {
    const map = new Map<string, number>();
    intakeLeads.forEach((l) => {
      map.set(l.source, (map.get(l.source) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [intakeLeads]);

  // Checkout leads by source
  const checkoutBySource = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => {
      const src = l.source || "direct";
      map.set(src, (map.get(src) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [leads]);

  // UTM breakdown across ALL leads (both tables)
  const utmBreakdown = useMemo(() => {
    const campaigns = new Map<string, { leads: number; sales: number; revenue: number }>();
    const sources = new Map<string, number>();
    const mediums = new Map<string, number>();

    const processUtm = (utm: Record<string, string> | undefined, completed?: boolean, total?: number) => {
      if (!utm || Object.keys(utm).length === 0) return;
      if (utm.utm_source) sources.set(utm.utm_source, (sources.get(utm.utm_source) || 0) + 1);
      if (utm.utm_medium) mediums.set(utm.utm_medium, (mediums.get(utm.utm_medium) || 0) + 1);
      if (utm.utm_campaign) {
        const entry = campaigns.get(utm.utm_campaign) || { leads: 0, sales: 0, revenue: 0 };
        entry.leads++;
        if (completed) {
          entry.sales++;
          entry.revenue += total || 0;
        }
        campaigns.set(utm.utm_campaign, entry);
      }
    };

    leads.forEach((l) => processUtm(l.utm_params, l.completed, Number(l.cart_total)));
    intakeLeads.forEach((l) => processUtm(l.utm_params));

    return {
      campaigns: Array.from(campaigns.entries()).sort((a, b) => b[1].leads - a[1].leads),
      sources: Array.from(sources.entries()).sort((a, b) => b[1] - a[1]),
      mediums: Array.from(mediums.entries()).sort((a, b) => b[1] - a[1]),
      hasData: campaigns.size > 0 || sources.size > 0,
    };
  }, [leads, intakeLeads]);

  // Daily breakdown merging leads + traffic
  const dailyBreakdown = useMemo<DailyBreakdown[]>(() => {
    const map = new Map<string, { leads: number; sales: number; revenue: number; views: number; unique: number; intakeLeads: number }>();

    // Seed from traffic daily data
    traffic.dailyTraffic.forEach((t) => {
      map.set(t.date, { leads: 0, sales: 0, revenue: 0, views: t.views, unique: t.unique, intakeLeads: 0 });
    });

    filteredLeads.forEach((l) => {
      const day = toPTDate(l.created_at);
      const entry = map.get(day) || { leads: 0, sales: 0, revenue: 0, views: 0, unique: 0, intakeLeads: 0 };
      entry.leads++;
      if (l.completed) {
        entry.sales++;
        entry.revenue += Number(l.cart_total);
      }
      map.set(day, entry);
    });

    filteredIntakeLeads.forEach((l) => {
      const day = toPTDate(l.created_at);
      const entry = map.get(day) || { leads: 0, sales: 0, revenue: 0, views: 0, unique: 0, intakeLeads: 0 };
      entry.intakeLeads++;
      map.set(day, entry);
    });

    return Array.from(map.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, v]) => ({
        date,
        leads: v.leads,
        sales: v.sales,
        abandoned: v.leads - v.sales,
        revenue: v.revenue,
        conversionRate: v.leads > 0 ? parseFloat(((v.sales / v.leads) * 100).toFixed(1)) : 0,
        views: v.views,
        unique: v.unique,
        intakeLeads: v.intakeLeads,
      }));
  }, [filteredLeads, filteredIntakeLeads, traffic.dailyTraffic]);

  const formatUtmForCSV = (utm?: Record<string, string>) => {
    if (!utm || Object.keys(utm).length === 0) return "";
    return Object.entries(utm).map(([k, v]) => `${k}=${v}`).join("; ");
  };

  // CSV export
  const exportCSV = () => {
    if (activeTab === "checkout") {
      const headers = ["Name", "Email", "Phone", "Source", "UTM", "Cart Total", "Status", "Date", "Cart Items"];
      const rows = filteredLeads.map((l) => [
        `${l.first_name} ${l.last_name || ""}`.trim(),
        l.email,
        l.phone || "",
        l.source || "direct",
        formatUtmForCSV(l.utm_params),
        Number(l.cart_total).toFixed(2),
        l.completed ? "Completed" : "Abandoned",
        toPTFull(l.created_at),
        formatCartItems(l.cart_items),
      ]);
      downloadCSV([headers, ...rows], "checkout-leads");
    } else {
      const headers = ["Name", "Email", "Phone", "Source", "UTM", "Date"];
      const rows = filteredIntakeLeads.map((l) => [
        l.first_name,
        l.email,
        l.phone || "",
        l.source,
        formatUtmForCSV(l.utm_params),
        toPTFull(l.created_at),
      ]);
      downloadCSV([headers, ...rows], "intake-leads");
    }
  };

  // Login gate
  if (!authed) {
    return (
      <div className="admin-login-gate">
        <div className="login-card" style={{ maxWidth: 380, width: "100%", borderRadius: 12, padding: "2rem" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem", color: "hsl(220 15% 95%)" }}>
            Admin Dashboard
          </h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: 8, border: "1px solid hsl(220 15% 25%)", background: "hsl(220 20% 12%)", color: "hsl(220 15% 90%)", fontSize: "0.9rem", marginBottom: "0.75rem", outline: "none" }}
          />
          {error && <p style={{ color: "hsl(0 65% 60%)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{error}</p>}
          <button
            onClick={handleLogin}
            style={{ width: "100%", padding: "0.6rem", borderRadius: 8, background: "hsl(210 80% 55%)", color: "white", fontWeight: 600, fontSize: "0.9rem", border: "none", cursor: "pointer" }}
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-inner">
        {/* Header */}
        <div className="admin-dashboard-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h1>Analytics Dashboard</h1>
            <span style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 4,
              background: isLive ? "hsl(142 70% 45%)" : "hsl(45 90% 50%)",
              color: isLive ? "white" : "hsl(45 90% 15%)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>
              {isLive ? "LIVE" : "TEST"}
            </span>
            <span style={{ fontSize: "0.7rem", color: "hsl(220 15% 45%)", fontStyle: "italic" }}>
              All times Pacific (PT)
            </span>
          </div>
          <div className="header-actions">
            <button className="export-btn" onClick={() => fetchData(token)}>↻ Refresh</button>
            <button
              className="export-btn"
              onClick={() => { sessionStorage.removeItem("admin_token"); setAuthed(false); setLeads([]); }}
            >
              Logout
            </button>
          </div>
        </div>

        {loading && (
          <p style={{ textAlign: "center", padding: "3rem 0", color: "hsl(220 15% 50%)" }}>Loading…</p>
        )}
        {error && (
          <p style={{ textAlign: "center", padding: "1rem 0", color: "hsl(0 65% 60%)" }}>{error}</p>
        )}

        {!loading && (
          <>
            {/* Stats Cards */}
            <div className="admin-stats-grid">
              <div className="stat-card traffic">
                <div className="stat-label">Total Page Views</div>
                <div className="stat-value">{traffic.totalPageViews.toLocaleString()}</div>
              </div>
              <div className="stat-card visitors">
                <div className="stat-label">Unique Visitors</div>
                <div className="stat-value">{traffic.uniqueVisitors.toLocaleString()}</div>
              </div>
              <div className="stat-card total" style={{ borderTop: "3px solid hsl(270 60% 55%)" }}>
                <div className="stat-label">All Leads (Combined)</div>
                <div className="stat-value">{stats.totalAllLeads}</div>
                <div style={{ fontSize: "0.72rem", color: "hsl(220 15% 50%)", marginTop: 2 }}>
                  {stats.total} checkout · {intakeLeads.length} intake
                </div>
              </div>
              <div className="stat-card sales">
                <div className="stat-label">Completed Sales</div>
                <div className="stat-value">{stats.sales}</div>
              </div>
              <div className="stat-card abandoned">
                <div className="stat-label">Abandoned</div>
                <div className="stat-value">{stats.abandoned}</div>
              </div>
              <div className="stat-card rate">
                <div className="stat-label">Conversion Rate</div>
                <div className="stat-value">{stats.rate}%</div>
              </div>
              <div className="stat-card revenue">
                <div className="stat-label">Total Revenue</div>
                <div className="stat-value">${stats.revenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            {/* Intake Leads by Source */}
            {/* Leads by Source (both tables) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              {intakeBySource.length > 0 && (
                <div className="admin-table-card">
                  <div className="table-header"><h2>Intake Leads by Source</h2></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", padding: "1rem" }}>
                    {intakeBySource.map(([source, count]) => (
                      <div key={source} style={{ background: "hsl(220 20% 16%)", border: "1px solid hsl(220 15% 22%)", borderRadius: 8, padding: "0.6rem 1rem", minWidth: 120 }}>
                        <div style={{ fontSize: "0.75rem", color: "hsl(220 15% 55%)", marginBottom: 2 }}>{source}</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "hsl(220 15% 90%)" }}>{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {checkoutBySource.length > 0 && (
                <div className="admin-table-card">
                  <div className="table-header"><h2>Checkout Leads by Source</h2></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", padding: "1rem" }}>
                    {checkoutBySource.map(([source, count]) => (
                      <div key={source} style={{ background: "hsl(220 20% 16%)", border: "1px solid hsl(220 15% 22%)", borderRadius: 8, padding: "0.6rem 1rem", minWidth: 120 }}>
                        <div style={{ fontSize: "0.75rem", color: "hsl(210 80% 55%)", marginBottom: 2 }}>{source}</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "hsl(220 15% 90%)" }}>{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* UTM Campaign Breakdown */}
            {utmBreakdown.hasData && (
              <div className="admin-table-card" style={{ marginBottom: "1.5rem" }}>
                <div className="table-header">
                  <h2>UTM Campaign Performance</h2>
                </div>
                {/* UTM Sources & Mediums chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: "1rem 1rem 0" }}>
                  {utmBreakdown.sources.length > 0 && (
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "hsl(220 15% 45%)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Sources</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {utmBreakdown.sources.map(([src, count]) => (
                          <span key={src} style={{ fontSize: "0.78rem", padding: "3px 10px", borderRadius: 6, background: "hsl(142 40% 18%)", color: "hsl(142 60% 70%)", border: "1px solid hsl(142 40% 25%)" }}>
                            {src} <strong>({count})</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {utmBreakdown.mediums.length > 0 && (
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "hsl(220 15% 45%)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Mediums</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {utmBreakdown.mediums.map(([med, count]) => (
                          <span key={med} style={{ fontSize: "0.78rem", padding: "3px 10px", borderRadius: 6, background: "hsl(210 40% 18%)", color: "hsl(210 60% 70%)", border: "1px solid hsl(210 40% 25%)" }}>
                            {med} <strong>({count})</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Campaign table */}
                {utmBreakdown.campaigns.length > 0 && (
                  <div style={{ overflowX: "auto", padding: "1rem" }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Campaign</th>
                          <th className="text-right">Leads</th>
                          <th className="text-right">Sales</th>
                          <th className="text-right">Revenue</th>
                          <th className="text-right">Conv %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {utmBreakdown.campaigns.map(([campaign, data]) => (
                          <tr key={campaign}>
                            <td style={{ fontWeight: 500, color: "hsl(220 15% 90%)" }}>{campaign}</td>
                            <td className="text-right">{data.leads}</td>
                            <td className="text-right">{data.sales}</td>
                            <td className="text-right">${data.revenue.toFixed(2)}</td>
                            <td className="text-right">{data.leads > 0 ? ((data.sales / data.leads) * 100).toFixed(1) : "0.0"}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {utmBreakdown.campaigns.length === 0 && (
                  <p style={{ padding: "1rem", fontSize: "0.85rem", color: "hsl(220 15% 45%)" }}>
                    UTM sources detected but no campaigns tagged yet.
                  </p>
                )}
              </div>
            )}

            {/* Conversion Funnel */}
            <div className="funnel-section">
              <h2>Conversion Funnel</h2>
              <div className="funnel-bar-container">
                <div className="funnel-row">
                  <span className="funnel-label">Traffic</span>
                  <div className="funnel-track">
                    <div className="funnel-fill traffic-fill" style={{ width: "100%" }}>{traffic.totalPageViews.toLocaleString()}</div>
                  </div>
                  <span className="funnel-count">{traffic.uniqueVisitors.toLocaleString()} unique</span>
                </div>
                <div className="funnel-row">
                  <span className="funnel-label">All Leads</span>
                  <div className="funnel-track">
                    <div
                      className="funnel-fill leads"
                      style={{ width: traffic.totalPageViews > 0 ? `${Math.max((stats.totalAllLeads / traffic.totalPageViews) * 100, 2)}%` : "100%" }}
                    >
                      {stats.totalAllLeads}
                    </div>
                  </div>
                  <span className="funnel-count">
                    {traffic.totalPageViews > 0 ? ((stats.totalAllLeads / traffic.totalPageViews) * 100).toFixed(1) : "—"}%
                  </span>
                </div>
                <div className="funnel-row">
                  <span className="funnel-label">Completed</span>
                  <div className="funnel-track">
                    <div
                      className="funnel-fill sales"
                      style={{ width: traffic.totalPageViews > 0 ? `${Math.max((stats.sales / traffic.totalPageViews) * 100, 1)}%` : "0%" }}
                    >
                      {stats.sales}
                    </div>
                  </div>
                  <span className="funnel-count">{stats.rate}%</span>
                </div>
              </div>
            </div>

            {/* Top Pages */}
            {traffic.topPages.length > 0 && (
              <div className="admin-table-card">
                <div className="table-header">
                  <h2>Top Pages</h2>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Page</th>
                        <th className="text-right">Views</th>
                        <th className="text-right">Unique Visitors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {traffic.topPages.map((p) => (
                        <tr key={p.page}>
                          <td style={{ fontWeight: 500, color: "hsl(220 15% 90%)" }}>{p.page}</td>
                          <td className="text-right">{p.views.toLocaleString()}</td>
                          <td className="text-right">{p.unique.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="admin-filters">
              <span className="filter-label">Filters</span>
              <input
                type="text"
                placeholder="Search name, email, phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ minWidth: 200 }}
              />
              {activeTab === "checkout" && (
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="abandoned">Abandoned</option>
                </select>
              )}
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} title="From date" />
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} title="To date" />
              <button className="export-btn" onClick={exportCSV}>⬇ Export CSV</button>
              <span style={{ fontSize: "0.78rem", color: "hsl(220 15% 45%)", marginLeft: "auto" }}>
                {activeTab === "checkout" ? `${filteredLeads.length} of ${leads.length} leads` : `${filteredIntakeLeads.length} of ${intakeLeads.length} leads`}
              </span>
            </div>

            {/* Daily Breakdown */}
            <div className="admin-table-card">
              <div className="table-header">
                <h2>Daily Breakdown</h2>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th className="text-right">Views</th>
                      <th className="text-right">Unique</th>
                      <th className="text-right">Checkout Leads</th>
                      <th className="text-right">Intake Leads</th>
                      <th className="text-right">Sales</th>
                      <th className="text-right">Revenue</th>
                      <th className="text-right">Conv %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyBreakdown.map((d) => (
                      <tr key={d.date}>
                        <td>{d.date}</td>
                        <td className="text-right">{d.views.toLocaleString()}</td>
                        <td className="text-right">{d.unique.toLocaleString()}</td>
                        <td className="text-right">{d.leads}</td>
                        <td className="text-right">{d.intakeLeads}</td>
                        <td className="text-right">{d.sales}</td>
                        <td className="text-right">${d.revenue.toFixed(2)}</td>
                        <td className="text-right">{d.conversionRate}%</td>
                      </tr>
                    ))}
                    {dailyBreakdown.length === 0 && (
                      <tr><td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "hsl(220 15% 40%)" }}>No data for selected filters</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lead Tabs */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <button
                className="export-btn"
                style={{
                  background: activeTab === "checkout" ? "hsl(210 80% 55%)" : undefined,
                  color: activeTab === "checkout" ? "white" : undefined,
                }}
                onClick={() => setActiveTab("checkout")}
              >
                Checkout Leads ({leads.length})
              </button>
              <button
                className="export-btn"
                style={{
                  background: activeTab === "intake" ? "hsl(270 60% 55%)" : undefined,
                  color: activeTab === "intake" ? "white" : undefined,
                }}
                onClick={() => setActiveTab("intake")}
              >
                Intake Leads ({intakeLeads.length})
              </button>
            </div>

            {/* Checkout Leads Table */}
            {activeTab === "checkout" && (
              <div className="admin-table-card">
                <div className="table-header">
                  <h2>Checkout Leads</h2>
                  <span style={{ fontSize: "0.78rem", color: "hsl(220 15% 45%)" }}>{filteredLeads.length} results</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Source</th>
                        <th>UTM</th>
                        <th>Cart Items</th>
                        <th className="text-right">Total</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((l) => (
                        <tr key={l.id}>
                          <td style={{ fontWeight: 500, color: "hsl(220 15% 90%)" }}>
                            {l.first_name} {l.last_name || ""}
                          </td>
                          <td>{l.email}</td>
                          <td>{l.phone || "—"}</td>
                          <td>
                            <span style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: 4, background: "hsl(210 40% 20%)", color: "hsl(210 60% 70%)" }}>
                              {l.source || "direct"}
                            </span>
                          </td>
                          <td>
                            {l.utm_params && Object.keys(l.utm_params).length > 0 ? (
                              <span title={Object.entries(l.utm_params).map(([k, v]) => `${k}=${v}`).join(", ")} style={{ fontSize: "0.72rem", color: "hsl(142 60% 65%)", cursor: "help" }}>
                                {l.utm_params.utm_campaign || l.utm_params.utm_source || "tagged"}
                              </span>
                            ) : <span style={{ color: "hsl(220 15% 35%)" }}>—</span>}
                          </td>
                          <td>
                            <span className="cart-items-preview" title={formatCartItems(l.cart_items)}>
                              {formatCartItems(l.cart_items) || "—"}
                            </span>
                          </td>
                          <td className="text-right" style={{ fontWeight: 600, color: "hsl(220 15% 90%)" }}>
                            ${Number(l.cart_total).toFixed(2)}
                          </td>
                          <td>
                            <span className={`status-badge ${l.completed ? "completed" : "abandoned"}`}>
                              {l.completed ? "Completed" : "Abandoned"}
                            </span>
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {toPTDisplay(l.created_at)}{" "}
                            <span style={{ color: "hsl(220 15% 45%)" }}>
                              {toPTTime(l.created_at)}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredLeads.length === 0 && (
                        <tr><td colSpan={9} style={{ textAlign: "center", padding: "2rem", color: "hsl(220 15% 40%)" }}>No leads match your filters</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Intake Leads Table */}
            {activeTab === "intake" && (
              <div className="admin-table-card">
                <div className="table-header">
                  <h2>Intake / Guide Leads</h2>
                  <span style={{ fontSize: "0.78rem", color: "hsl(220 15% 45%)" }}>{filteredIntakeLeads.length} results</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Source</th>
                        <th>UTM</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIntakeLeads.map((l) => (
                        <tr key={l.id}>
                          <td style={{ fontWeight: 500, color: "hsl(220 15% 90%)" }}>{l.first_name}</td>
                          <td>{l.email}</td>
                          <td>{l.phone || "—"}</td>
                          <td>
                            <span style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: 4, background: "hsl(270 40% 20%)", color: "hsl(270 60% 75%)" }}>
                              {l.source}
                            </span>
                          </td>
                          <td>
                            {l.utm_params && Object.keys(l.utm_params).length > 0 ? (
                              <span title={Object.entries(l.utm_params).map(([k, v]) => `${k}=${v}`).join(", ")} style={{ fontSize: "0.72rem", color: "hsl(142 60% 65%)", cursor: "help" }}>
                                {l.utm_params.utm_campaign || l.utm_params.utm_source || "tagged"}
                              </span>
                            ) : <span style={{ color: "hsl(220 15% 35%)" }}>—</span>}
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {toPTDisplay(l.created_at)}{" "}
                            <span style={{ color: "hsl(220 15% 45%)" }}>
                              {toPTTime(l.created_at)}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredIntakeLeads.length === 0 && (
                        <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "hsl(220 15% 40%)" }}>No intake leads match your filters</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function formatCartItems(items: any): string {
  if (!items) return "";
  try {
    const arr = Array.isArray(items) ? items : JSON.parse(items);
    if (!Array.isArray(arr) || arr.length === 0) return "";
    return arr.map((i: any) => {
      const title = i.title || i.product?.node?.title || i.item_name || "Item";
      const qty = i.quantity || 1;
      return `${title} ×${qty}`;
    }).join(", ");
  } catch {
    return String(items);
  }
}

function downloadCSV(data: string[][], prefix: string) {
  const csv = data.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${prefix}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
