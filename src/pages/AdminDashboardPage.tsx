import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  conversionRate: number;
}

export default function AdminDashboardPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(
    () => !!sessionStorage.getItem("admin_token")
  );
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = sessionStorage.getItem("admin_token") || "";

  const fetchData = async (t: string) => {
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
  };

  const handleLogin = () => {
    if (!password.trim()) return;
    sessionStorage.setItem("admin_token", password);
    setAuthed(true);
    fetchData(password);
  };

  useEffect(() => {
    if (authed && token) fetchData(token);
  }, []);

  const stats = useMemo(() => {
    const total = leads.length;
    const sales = leads.filter((l) => l.completed).length;
    const abandoned = total - sales;
    const rate = total > 0 ? ((sales / total) * 100).toFixed(1) : "0.0";
    return { total, sales, abandoned, rate };
  }, [leads]);

  const dailyBreakdown = useMemo<DailyBreakdown[]>(() => {
    const map = new Map<string, { leads: number; sales: number }>();
    leads.forEach((l) => {
      const day = l.created_at.slice(0, 10);
      const entry = map.get(day) || { leads: 0, sales: 0 };
      entry.leads++;
      if (l.completed) entry.sales++;
      map.set(day, entry);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, v]) => ({
        date,
        leads: v.leads,
        sales: v.sales,
        abandoned: v.leads - v.sales,
        conversionRate:
          v.leads > 0
            ? parseFloat(((v.sales / v.leads) * 100).toFixed(1))
            : 0,
      }));
  }, [leads]);

  if (!authed) {
    return (
      <div className="admin-login-gate">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button className="w-full" onClick={handleLogin}>
              Access Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1 className="text-2xl font-bold">Checkout Leads Dashboard</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            sessionStorage.removeItem("admin_token");
            setAuthed(false);
            setLeads([]);
          }}
        >
          Logout
        </Button>
      </div>

      {loading && <p className="text-muted-foreground text-center py-8">Loading…</p>}
      {error && <p className="text-destructive text-center py-4">{error}</p>}

      {!loading && (
        <>
          {/* Summary Cards */}
          <div className="admin-stats-grid">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completed Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {stats.sales}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Abandoned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-500">
                  {stats.abandoned}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.rate}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Daily Breakdown */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Daily Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Leads</TableHead>
                    <TableHead className="text-right">Sales</TableHead>
                    <TableHead className="text-right">Abandoned</TableHead>
                    <TableHead className="text-right">Conv %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyBreakdown.map((d) => (
                    <TableRow key={d.date}>
                      <TableCell>{d.date}</TableCell>
                      <TableCell className="text-right">{d.leads}</TableCell>
                      <TableCell className="text-right">{d.sales}</TableCell>
                      <TableCell className="text-right">
                        {d.abandoned}
                      </TableCell>
                      <TableCell className="text-right">
                        {d.conversionRate}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Individual Leads */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>All Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell>
                          {l.first_name} {l.last_name || ""}
                        </TableCell>
                        <TableCell>{l.email}</TableCell>
                        <TableCell>{l.phone || "—"}</TableCell>
                        <TableCell className="text-right">
                          ${Number(l.cart_total).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={l.completed ? "default" : "destructive"}
                          >
                            {l.completed ? "Completed" : "Abandoned"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(l.created_at).toLocaleDateString()}{" "}
                          {new Date(l.created_at).toLocaleTimeString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
