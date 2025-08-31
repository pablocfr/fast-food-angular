import {Component, EventEmitter, inject, OnDestroy, OnInit, Output, signal} from '@angular/core';
import {PantallaService} from '../../services/pantalla.service';
import {forkJoin} from 'rxjs';
import {CommonModule} from '@angular/common';
import {Location} from '@angular/common';
import {FechaHoraComponent} from '../fecha-hora/fecha-hora.component';
import {DespachoComponent} from '../despacho/despacho.component';
import {DatosService} from '../../../producto/services/datos.service';

@Component({
  selector: 'app-espera',
  imports: [CommonModule, FechaHoraComponent, DespachoComponent],
  templateUrl: './espera.component.html',
  styleUrl: './espera.component.css'
})
export class EsperaComponent implements OnInit, OnDestroy {

  readonly service = inject(PantallaService);
  readonly datosService = inject(DatosService)

  pedidosPendientes = signal<Pedido[]>([]);
  pedidosCompletados = signal<Pedido[]>([]);
  pedidosPreparacion = signal<Pedido[]>([]);
  pedidosEntregados = signal<Pedido[]>([]);
  loading = signal(false);

  private refreshInterval: any; // Referencia al setInterval

  constructor(private readonly location: Location) {}

  ngOnInit(): void {
    this.cargarPedidos();

    // Actualizar pedidos cada 30 segundos
    this.refreshInterval = setInterval(() => {
      this.cargarPedidos();
    }, 5000);
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo cuando el componente se destruya
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  private cargarPedidos() {
    this.loading.set(true);

    forkJoin({
      pendientes: this.service.loadPedidosPorEstado('Pendiente'),
      completados: this.service.loadPedidosPorEstado('Completado'),
      preparando: this.service.loadPedidosPorEstado('Preparando'),
      entregados: this.service.loadPedidosPorEstado('Entregado')
    }).subscribe({
      next: (res) => {
        this.pedidosPendientes.set(res.pendientes || []);
        this.pedidosCompletados.set(res.completados || []);
        this.pedidosPreparacion.set(res.preparando || []);
        this.pedidosEntregados.set(res.entregados || []);

        // pasar a datos service
        this.datosService.pedidosPendientes.set(res.pendientes || []);
        this.datosService.pedidosCompletados.set(res.completados || []);
        this.datosService.pedidosPreparacion.set(res.preparando || []);
        this.datosService.pedidosEntregados.set(res.entregados || []);
        console.log('Pedios', this.datosService.pedidosCompletados());
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  trackByPedido(index: number, pedido: Pedido): number {
    return pedido.idPedido;
  }

  goBack() {
    console.log('Ejecutando goBack');
    this.location.back();
  }

}

