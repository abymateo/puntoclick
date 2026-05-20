import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  AlertTriangle,
  Package,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { PRODUCTS, RECENT_SALES, SALES_BY_CATEGORY, SALES_BY_DAY } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — NovaPOS" }] }),
});

const CHART_COLORS = ["#007AFF", "#FFC107", "#FF3F34", "#22C55E", "#A855F7"];

function StatCard({
  label, value, delta, icon: Icon, tone = "primary",
}: { label: string; value: string; delta?: string; icon: React.ElementType; tone?: "primary" | "accent" | "destructive" | "success" }) {
  const toneMap = {
    primary: "bg-primary-soft text-primary",
    accent: "bg-accent/20 text-accent-foreground",
    destructive: "bg-destructive/10 text-destructive",
    success: "bg-success/15 text-success",
  };
  return (
    <Card className="card-hover border-border/60 shadow-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
            {delta && (
              <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-success">
                <ArrowUpRight className="h-3.5 w-3.5" /> {delta}
              </div>
            )}
          </div>
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneMap[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const lowStock = PRODUCTS.filter((p) => p.stock <= p.minStock);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Buen día, Juan 👋</h1>
          <p className="text-sm text-muted-foreground">Resumen de actividad de tu negocio hoy.</p>
        </div>
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">En vivo · Caja 1</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Ventas del día" value="$2,560" delta="+12.4%" icon={DollarSign} tone="primary" />
        <StatCard label="Tickets" value="38" delta="+5 vs ayer" icon={ShoppingBag} tone="accent" />
        <StatCard label="Ganancia estimada" value="$980" delta="+8.1%" icon={TrendingUp} tone="success" />
        <StatCard label="Stock bajo" value={`${lowStock.length} prod.`} icon={AlertTriangle} tone="destructive" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Ventas de la semana</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_BY_DAY} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gPrimary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#007AFF" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#007AFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
                <Area type="monotone" dataKey="ventas" stroke="#007AFF" strokeWidth={2.5} fill="url(#gPrimary)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Ventas por categoría</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SALES_BY_CATEGORY} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {SALES_BY_CATEGORY.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/60 shadow-card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Ventas recientes</CardTitle>
            <Badge variant="outline" className="rounded-full">Hoy</Badge>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {RECENT_SALES.map((s) => (
                <div key={s.folio} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-semibold">{s.folio}</p>
                    <p className="text-xs text-muted-foreground">{s.date} · {s.cashier}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="rounded-full text-[10px]">{s.payment}</Badge>
                    <span className="text-sm font-bold">${s.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" /> Inventario bajo
            </CardTitle>
            <Badge variant="destructive" className="rounded-full">{lowStock.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {lowStock.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sku} · {p.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-destructive">{p.stock} u.</p>
                    <p className="text-[11px] text-muted-foreground">mín. {p.minStock}</p>
                  </div>
                </div>
              ))}
              {lowStock.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">Todo en orden ✨</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
