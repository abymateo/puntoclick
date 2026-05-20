export type Category =
  | "Papelería"
  | "Escritura"
  | "Escolar"
  | "Oficina"
  | "Novedades"
  | "Arte"
  | "Otros";

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: Category;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  image?: string;
};

export const CATEGORIES: Category[] = [
  "Papelería",
  "Escritura",
  "Escolar",
  "Oficina",
  "Novedades",
  "Arte",
  "Otros",
];

export const PRODUCTS: Product[] = [
  { id: "1", sku: "P001", name: "Cuaderno Profesional 100h", category: "Escolar", price: 45, cost: 28, stock: 120, minStock: 20 },
  { id: "2", sku: "P002", name: "Bolígrafo BIC Azul", category: "Escritura", price: 8, cost: 4, stock: 350, minStock: 50 },
  { id: "3", sku: "P003", name: "Lápiz Mirado #2", category: "Escritura", price: 6, cost: 3, stock: 280, minStock: 50 },
  { id: "4", sku: "P004", name: "Goma Milán", category: "Escolar", price: 10, cost: 5, stock: 95, minStock: 30 },
  { id: "5", sku: "P005", name: "Marcador Sharpie Negro", category: "Escritura", price: 35, cost: 20, stock: 60, minStock: 15 },
  { id: "6", sku: "P006", name: "Resma Hojas Carta", category: "Oficina", price: 145, cost: 110, stock: 18, minStock: 10 },
  { id: "7", sku: "P007", name: "Tijeras Escolares", category: "Escolar", price: 28, cost: 16, stock: 45, minStock: 10 },
  { id: "8", sku: "P008", name: "Pegamento UHU 40g", category: "Papelería", price: 32, cost: 18, stock: 8, minStock: 15 },
  { id: "9", sku: "P009", name: "Acuarelas 12 colores", category: "Arte", price: 75, cost: 45, stock: 24, minStock: 8 },
  { id: "10", sku: "P010", name: "Sticker Pack Kawaii", category: "Novedades", price: 25, cost: 12, stock: 140, minStock: 30 },
  { id: "11", sku: "P011", name: "Carpeta 3 Argollas", category: "Oficina", price: 95, cost: 65, stock: 32, minStock: 10 },
  { id: "12", sku: "P012", name: "Plumones Crayola 10pz", category: "Arte", price: 89, cost: 55, stock: 40, minStock: 12 },
  { id: "13", sku: "P013", name: "Calculadora Básica", category: "Oficina", price: 120, cost: 70, stock: 15, minStock: 5 },
  { id: "14", sku: "P014", name: "Libreta de Notas", category: "Novedades", price: 55, cost: 30, stock: 75, minStock: 20 },
  { id: "15", sku: "P015", name: "Cinta Adhesiva", category: "Papelería", price: 18, cost: 9, stock: 110, minStock: 25 },
];

export type SaleRow = {
  folio: string;
  date: string;
  cashier: string;
  total: number;
  payment: "Efectivo" | "Tarjeta" | "Transferencia";
};

export const RECENT_SALES: SaleRow[] = [
  { folio: "V-00025", date: "20/05/2026 10:25", cashier: "Juan Pérez", total: 98, payment: "Efectivo" },
  { folio: "V-00024", date: "20/05/2026 09:50", cashier: "María López", total: 156, payment: "Tarjeta" },
  { folio: "V-00023", date: "19/05/2026 18:15", cashier: "Juan Pérez", total: 75, payment: "Efectivo" },
  { folio: "V-00022", date: "19/05/2026 17:45", cashier: "María López", total: 230, payment: "Transferencia" },
  { folio: "V-00021", date: "19/05/2026 16:30", cashier: "Juan Pérez", total: 65, payment: "Efectivo" },
];

export const SALES_BY_DAY = [
  { day: "Lun", ventas: 2100 },
  { day: "Mar", ventas: 1850 },
  { day: "Mié", ventas: 2400 },
  { day: "Jue", ventas: 1980 },
  { day: "Vie", ventas: 3100 },
  { day: "Sáb", ventas: 3850 },
  { day: "Dom", ventas: 1450 },
];

export const SALES_BY_CATEGORY = [
  { name: "Escritura", value: 32 },
  { name: "Escolar", value: 28 },
  { name: "Oficina", value: 18 },
  { name: "Novedades", value: 12 },
  { name: "Arte", value: 10 },
];
