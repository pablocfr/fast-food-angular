import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  pedidosPendientes = signal<Pedido[]>([]);
  pedidosCompletados = signal<Pedido[]>([]);
  pedidosPreparacion = signal<Pedido[]>([]);
  pedidosEntregados = signal<Pedido[]>([]);
}
