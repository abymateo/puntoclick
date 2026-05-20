import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/ventas")({
  component: () => <ModulePlaceholder title="Historial de Ventas" description="Filtra y consulta el detalle de todas las ventas." />,
  head: () => ({ meta: [{ title: "Historial de Ventas — NovaPOS" }] }),
});
