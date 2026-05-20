import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/apartados")({
  component: () => <ModulePlaceholder title="Apartados" description="Productos reservados por clientes con seguimiento y fecha límite." />,
  head: () => ({ meta: [{ title: "Apartados — NovaPOS" }] }),
});
