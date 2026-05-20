import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Pencil, Trash2, Package, Filter } from "lucide-react";
import { PRODUCTS } from "@/lib/mock-data";

export const Route = createFileRoute("/productos")({
  component: ProductosPage,
  head: () => ({ meta: [{ title: "Productos — NovaPOS" }] }),
});

function ProductosPage() {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const s = q.toLowerCase();
    return PRODUCTS.filter((p) =>
      !s || p.name.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s) || p.category.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Productos</h1>
          <p className="text-sm text-muted-foreground">Catálogo completo, precios e inventario.</p>
        </div>
        <Button className="btn-press h-11 rounded-xl px-5 shadow-card">
          <Plus className="mr-1 h-4 w-4" /> Nuevo producto
        </Button>
      </div>

      <Card className="border-border/60 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar producto..." className="h-11 rounded-xl pl-10" />
            </div>
            <Button variant="outline" className="h-11 rounded-xl">
              <Filter className="mr-2 h-4 w-4" /> Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="w-16">Img</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-right">Costo</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((p) => {
              const low = p.stock <= p.minStock;
              return (
                <TableRow key={p.id} className="hover:bg-secondary/40">
                  <TableCell>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{p.sku}</TableCell>
                  <TableCell className="font-semibold">{p.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full">{p.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">${p.price}</TableCell>
                  <TableCell className="text-right text-muted-foreground">${p.cost}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={low ? "destructive" : "secondary"} className="rounded-full">{p.stock} u.</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg"><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
