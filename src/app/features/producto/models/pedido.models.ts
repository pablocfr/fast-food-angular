interface Cliente{
  nombre: string;
}

interface Pedido {
  idPedido: number;
  fechaHora: string;
  estado: string;
  numeroTicket: string;
  cliente: Cliente;
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
