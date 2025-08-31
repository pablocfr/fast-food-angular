import {Component, OnInit, signal} from '@angular/core';
import {PantallaService} from '../../services/pantalla.service';
import {FechaHoraComponent} from '../fecha-hora/fecha-hora.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-cocina',
  imports: [
    FechaHoraComponent,
    NgForOf
  ],
  templateUrl: './cocina.component.html',
  styleUrl: './cocina.component.css'
})
export class CocinaComponent implements OnInit {

  pedidosPendientes = signal<Pedido[]>([]);
  pedidosPreparacion = signal<Pedido[]>([]);
  loading = signal(false);

  constructor(private readonly pantallaService : PantallaService) {
  }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  private cargarPedidos(): void {
    this.loading.set(true);

    // Traer pedidos pendientes
    this.pantallaService.loadPedidosPorEstado('Pendiente').subscribe({
      next: pedidos => this.pedidosPendientes.set(pedidos),
      error: err => console.error('Error al cargar pendientes', err),
      complete: () => this.loading.set(false)
    })

    // Traer pedidos en preparación
    this.pantallaService.loadPedidosPorEstado('Preparando').subscribe({
      next: pedidos => this.pedidosPreparacion.set(pedidos),
      error: err => console.error('Error al cargar en preparación', err),
      complete: () => this.loading.set(false)
    })
  }

  // Cambiar estado de Pendiente a Preparando o de Preparando a Listo
  prepararPedido(pedidoId: number){
    this.pantallaService.cambiarEstadoPedido(pedidoId).subscribe({
      next: (res) => {
        console.log('Pedido actualizado', res);
        this.cargarPedidos();
      },
      error: (err) => console.error('Error al actualizar pedido', err)
    })
  }

  trackByPedido(index: number, pedido: Pedido): number {
    return pedido.idPedido;
  }
}
