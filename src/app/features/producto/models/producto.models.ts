interface Categoria {
  idCategoria: number;
  nombre: string;
  activo: boolean;
}

interface Proveedor {
  idProveedor: number;
  nombre: string;
  contacto: string;
  activo: boolean;
  productos: any | null;
}

interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  requiereCocina: boolean;
  activo: boolean;
  categoria: Categoria;
  proveedor: Proveedor;
//  comboProductos: any | null;
//  detalles: any | null;
}

interface ApiResponseProductos {
  contenido: Producto[];
  paginaActual: number;
  tamanio: number;
  totalElementos: number;
  totalPaginas: number;
  primera: boolean;
  ultima: boolean;
  vacia: boolean;
}
