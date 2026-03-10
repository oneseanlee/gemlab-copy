import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import "./AdminDashboardPage.css";

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
}

interface DailyBreakdown {
  date: string;
  leads: number;
  sales: number;
  abandoned: number;
  revenue: number;
  conversionRate: number;
}

export default function AdminDashboardPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("admin_token"));
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "abandoned">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const token = sessionStorage.getItem("admin_token") || "";

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

  // Filtered leads
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
      if (dateFrom && l.created_at.slice(0, 10) < dateFrom) return false;
      if (dateTo && l.created_at.slice(0, 10) > dateTo) return false;
      return true;
    });
  }, [leads, search, statusFilter, dateFrom, dateTo]);

  // Stats from ALL leads (unfiltered)
  const stats = useMemo(() => {
    const total = leads.length;
    const sales = leads.filter((l) => l.completed).length;
    const abandoned = total - sales;
    const rate = total > 0 ? ((sales / total) * 100).toFixed(1) : "0.0";
    const revenue = leads
      .filter((l) => l.completed)
      .reduce((sum, l) => sum + Number(l.cart_total), 0);
    return { total, sales, abandoned, rate, revenue };
  }, [leads]);

  // Daily breakdown from filtered leads
  const dailyBreakdown = useMemo<DailyBreakdown[]>(() => {
    const map = new Map<string, { leads: number; sales: number; revenue: number }>();
    filteredLeads.forEach((l) => {
      const day = l.created_at.slice(0, 10);
      const entry = map.get(day) || { leads: 0, sales: 0, revenue: 0 };
      entry.leads++;
      if (l.completed) {
        entry.sales++;
        entry.revenue += Number(l.cart_total);
      }
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
      }));
  }, [filteredLeads]);

  // CSV export
  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Cart Total", "Status", "Date", "Cart Items"];
    const rows = filteredLeads.map((l) => [
      `${l.first_name} ${l.last_name || ""}`.trim(),
      l.email,
      l.phone || "",
      Number(l.cart_total).toFixed(2),
      l.completed ? "Completed" : "Abandoned",
      new Date(l.created_at).toLocaleString(),
      formatCartItems(l.cart_items),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
          <h1>Checkout Analytics</h1>
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
              <div className="stat-card total">
                <div className="stat-label">Total Leads</div>
                <div className="stat-value">{stats.total}</div>
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

            {/* Conversion Funnel */}
            <div className="funnel-section">
              <h2>Conversion Funnel</h2>
              <div className="funnel-bar-container">
                <div className="funnel-row">
                  <span className="funnel-label">Leads</span>
                  <div className="funnel-track">
                    <div className="funnel-fill leads" style={{ width: "100%" }}>{stats.total}</div>
                  </div>
                  <span className="funnel-count">{stats.total}</span>
                </div>
                <div className="funnel-row">
                  <span className="funnel-label">Completed</span>
                  <div className="funnel-track">
                    <div
                      className="funnel-fill sales"
                      style={{ width: stats.total > 0 ? `${(stats.sales / stats.total) * 100}%` : "0%" }}
                    >
                      {stats.sales}
                    </div>
                  </div>
                  <span className="funnel-count">{stats.rate}%</span>
                </div>
              </div>
            </div>

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
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="abandoned">Abandoned</option>
              </select>
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} title="From date" />
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} title="To date" />
              <button className="export-btn" onClick={exportCSV}>⬇ Export CSV</button>
              <span style={{ fontSize: "0.78rem", color: "hsl(220 15% 45%)", marginLeft: "auto" }}>
                {filteredLeads.length} of {leads.length} leads
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
                      <th className="text-right">Leads</th>
                      <th className="text-right">Sales</th>
                      <th className="text-right">Abandoned</th>
                      <th className="text-right">Revenue</th>
                      <th className="text-right">Conv %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyBreakdown.map((d) => (
                      <tr key={d.date}>
                        <td>{d.date}</td>
                        <td className="text-right">{d.leads}</td>
                        <td className="text-right">{d.sales}</td>
                        <td className="text-right">{d.abandoned}</td>
                        <td className="text-right">${d.revenue.toFixed(2)}</td>
                        <td className="text-right">{d.conversionRate}%</td>
                      </tr>
                    ))}
                    {dailyBreakdown.length === 0 && (
                      <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "hsl(220 15% 40%)" }}>No data for selected filters</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* All Leads */}
            <div className="admin-table-card">
              <div className="table-header">
                <h2>All Leads</h2>
                <span style={{ fontSize: "0.78rem", color: "hsl(220 15% 45%)" }}>{filteredLeads.length} results</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
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
                          {new Date(l.created_at).toLocaleDateString()}{" "}
                          <span style={{ color: "hsl(220 15% 45%)" }}>
                            {new Date(l.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredLeads.length === 0 && (
                      <tr><td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "hsl(220 15% 40%)" }}>No leads match your filters</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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
