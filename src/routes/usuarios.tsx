import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/usuarios")({
  component: () => <ModulePlaceholder title="Usuarios y Roles" description="Gestiona dueños, cajeros y permisos." />,
  head: () => ({ meta: [{ title: "Usuarios y Roles — NovaPOS" }] }),
});
