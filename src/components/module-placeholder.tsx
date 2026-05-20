import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

type Props = { title: string; description: string; backTo?: string };

export function ModulePlaceholder({ title, description }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Card className="border-dashed shadow-none">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Módulo en construcción</h3>
          <p className="max-w-md text-sm text-muted-foreground">
            Esta sección está lista en la arquitectura. Se conectará a Lovable Cloud para persistencia real en la siguiente iteración.
          </p>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/">Volver al Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Per-route file uses this component
export const Route = createFileRoute("/_placeholder")({
  component: () => null,
});
