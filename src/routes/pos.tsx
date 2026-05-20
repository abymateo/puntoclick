import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Plus, Minus, Trash2, ShoppingCart, X, Package } from "lucide-react";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/pos")({
  component: POSPage,
  head: () => ({ meta: [{ title: "Punto de Venta — NovaPOS" }] }),
});

type CartItem = { product: Product; qty: number };

function POSPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("Todas");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [pay, setPay] = useState<"Efectivo" | "Tarjeta" | "Transferencia">("Efectivo");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = cat === "Todas" || p.category === cat;
      const q = query.toLowerCase();
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, cat]);

  const addToCart = (p: Product) => {
    if (p.stock <= 0) return toast.error("Sin stock");
    setCart((c) => {
      const ex = c.find((i) => i.product.id === p.id);
      if (ex) return c.map((i) => i.product.id === p.id ? { ...i, qty: Math.min(i.qty + 1, p.stock) } : i);
      return [...c, { product: p, qty: 1 }];
    });
  };
  const changeQty = (id: string, delta: number) =>
    setCart((c) => c.map((i) => i.product.id === id
      ? { ...i, qty: Math.max(1, Math.min(i.qty + delta, i.product.stock)) }
      : i));
  const removeItem = (id: string) => setCart((c) => c.filter((i) => i.product.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const total = subtotal;

  const finalizar = () => {
    if (!cart.length) return;
    toast.success(`Venta cobrada: $${total.toFixed(2)} (${pay})`);
    setCart([]);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]">
      {/* Catálogo */}
      <div className="space-y-4">
        <Card className="border-border/60 shadow-card">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Buscar por nombre, SKU o código de barras..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 rounded-xl pl-10 text-base"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Todas", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`btn-press rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    cat === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card hover:bg-secondary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => {
            const low = p.stock <= p.minStock;
            return (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                className="card-hover group flex flex-col overflow-hidden rounded-2xl border bg-card text-left shadow-card"
              >
                <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-secondary to-primary-soft">
                  <Package className="h-10 w-10 text-primary/60 transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col gap-1 p-3">
                  <p className="line-clamp-2 text-sm font-semibold leading-tight">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.sku}</p>
                  <div className="mt-1 flex items-end justify-between">
                    <span className="text-base font-bold text-primary">${p.price}</span>
                    <Badge variant={low ? "destructive" : "secondary"} className="rounded-full text-[10px]">
                      {p.stock} u.
                    </Badge>
                  </div>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
              Sin resultados para "{query}"
            </div>
          )}
        </div>
      </div>

      {/* Ticket */}
      <Card className="border-border/60 shadow-card lg:sticky lg:top-20 lg:h-[calc(100vh-7rem)]">
        <CardContent className="flex h-full flex-col gap-4 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Ticket</h2>
            </div>
            {cart.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setCart([])} className="text-destructive">
                <Trash2 className="mr-1 h-4 w-4" /> Vaciar
              </Button>
            )}
          </div>

          <ScrollArea className="-mx-2 flex-1 px-2">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                  <ShoppingCart className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="mt-4 text-sm font-medium">Carrito vacío</p>
                <p className="mt-1 text-xs text-muted-foreground">Selecciona productos para iniciar.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.map((i) => (
                  <div key={i.product.id} className="flex items-center gap-2 rounded-xl border bg-card p-2.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{i.product.name}</p>
                      <p className="text-xs text-muted-foreground">${i.product.price} c/u</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-secondary p-0.5">
                      <button onClick={() => changeQty(i.product.id, -1)} className="btn-press flex h-7 w-7 items-center justify-center rounded-md hover:bg-card">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{i.qty}</span>
                      <button onClick={() => changeQty(i.product.id, 1)} className="btn-press flex h-7 w-7 items-center justify-center rounded-md hover:bg-card">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="w-16 text-right text-sm font-bold">${(i.product.price * i.qty).toFixed(0)}</span>
                    <button onClick={() => removeItem(i.product.id)} className="btn-press text-muted-foreground hover:text-destructive">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <Separator />

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {(["Efectivo", "Tarjeta", "Transferencia"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setPay(m)}
                  className={`btn-press rounded-xl border px-2 py-2 text-xs font-semibold transition ${
                    pay === m
                      ? "border-primary bg-primary-soft text-primary"
                      : "bg-card hover:bg-secondary"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-3xl font-bold tracking-tight">${total.toFixed(2)}</span>
            </div>
            <Button
              onClick={finalizar}
              disabled={!cart.length}
              className="btn-press h-14 w-full rounded-xl text-base font-bold shadow-card"
            >
              Cobrar ${total.toFixed(2)}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
