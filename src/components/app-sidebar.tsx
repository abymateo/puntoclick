import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Boxes,
  Receipt,
  Bookmark,
  BarChart3,
  Users,
  Settings,
  Sparkles,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const operacion = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Punto de Venta", url: "/pos", icon: ShoppingCart },
  { title: "Historial de Ventas", url: "/ventas", icon: Receipt },
  { title: "Apartados", url: "/apartados", icon: Bookmark },
];

const catalogo = [
  { title: "Productos", url: "/productos", icon: Package },
  { title: "Inventario", url: "/inventario", icon: Boxes },
  { title: "Reportes", url: "/reportes", icon: BarChart3 },
];

const admin = [
  { title: "Usuarios y Roles", url: "/usuarios", icon: Users },
  { title: "Configuración", url: "/configuracion", icon: Settings },
];

export function AppSidebar() {
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  const renderGroup = (label: string, items: typeof operacion) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                className="h-10 rounded-xl data-[active=true]:bg-primary-soft data-[active=true]:text-primary data-[active=true]:font-semibold transition-colors"
              >
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="h-[18px] w-[18px]" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="py-5">
        <Link to="/" className="flex items-center gap-2.5 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-card">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight">NovaPOS</span>
            <span className="text-[11px] text-muted-foreground">Papelería & Novedades</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {renderGroup("Operación", operacion)}
        {renderGroup("Catálogo", catalogo)}
        {renderGroup("Administración", admin)}
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="flex items-center gap-3 rounded-xl border bg-card p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            JP
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Juan Pérez</span>
            <span className="text-[11px] text-muted-foreground">Dueño</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
