import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/reportes")({
  component: () => <ModulePlaceholder title="Reportes" description="Gráficas y exportables de tu operación." />,
  head: () => ({ meta: [{ title: "Reportes — NovaPOS" }] }),
});
