import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/inventario")({
  component: () => <ModulePlaceholder title="Inventario" description="Entradas de mercancía, movimientos y alertas de stock." />,
  head: () => ({ meta: [{ title: "Inventario — NovaPOS" }] }),
});
