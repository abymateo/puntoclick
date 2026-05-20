import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/configuracion")({
  component: () => <ModulePlaceholder title="Configuración" description="Datos del negocio, impuestos, cajas y métodos de pago." />,
  head: () => ({ meta: [{ title: "Configuración — NovaPOS" }] }),
});
