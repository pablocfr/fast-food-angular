interface Cliente {
  idCliente: number;
  nombre: string;
}

interface Usuario {
  idUsuario: number | null;
  nombre: string;
}

interface DetallePedido {
  cantidad: number;
  estado: string;
  producto: Producto | null;
  combo: any | null; // Si luego tienes modelo de combo, lo reemplazas
}

interface Pedido {
  idPedido: number;
  fechaHora: string; // ISO string (ej: "2025-08-28T17:51:39")
  estado: string;
  numeroTicket: string;
  activo: boolean;
  cliente: Cliente;
  usuario: Usuario;
  detalles: DetallePedido[];
}

interface ApiResponsePedidos {
  contenido: Pedido[];
  paginaActual: number;
  tamanio: number;
  totalElementos: number;
  totalPaginas: number;
  primera: boolean;
  ultima: boolean;
  vacia: boolean;
}
