import {Component, Input, signal, Signal} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FechaHoraComponent} from '../fecha-hora/fecha-hora.component';
import {PantallaService} from '../../services/pantalla.service';

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.css'],
  imports: [
    NgForOf,
    FechaHoraComponent
  ]
})
export class DespachoComponent {
  pedidosCompletados = signal<Pedido[]>([]);
  pedidosEntregados = signal<Pedido[]>([]);
  loading = signal(false);

  constructor(private readonly pantallaService: PantallaService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  private cargarPedidos() {
    this.loading.set(true);

    // Traer pedidos completados
    this.pantallaService.loadPedidosPorEstado('completado').subscribe({
      next: pedidos => this.pedidosCompletados.set(pedidos),
      error: err => console.error('Error al cargar completados', err),
      complete: () => this.loading.set(false)
    });

    // Traer pedidos entregados
    this.pantallaService.loadPedidosPorEstado('entregado').subscribe({
      next: pedidos => this.pedidosEntregados.set(pedidos),
      error: err => console.error('Error al cargar entregados', err),
      complete: () => this.loading.set(false)
    });
  }

  entregarPedido(pedidoId: number){
    this.pantallaService.cambiarEstadoPedido(pedidoId).subscribe({
      next: (res) => {
        console.log('Pedido actualizado', res);
        // Opcional: actualizar lista localmente
        this.cargarPedidos();
      },
      error: (err) => console.error('Error al actualizar pedido', err)
    })
  };

  trackByPedido(index: number, pedido: Pedido): number {
    return pedido.idPedido;
  }
}
