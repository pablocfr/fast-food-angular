import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import {Router, RouterLink} from '@angular/router';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-pedido',
  imports: [
    DecimalPipe,
    RouterLink,
    DatePipe
  ],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent implements OnInit {

  Math= Math;

  readonly service = inject(ProductoService);
  readonly router = inject(Router);

  pedidos = signal<Pedido[]>([]);
  loading = signal(false);
  paginacion = signal({
    actual: 0,
    tamanio: 5,
    totalElementos: 0,
    totalPaginas: 0
  });

  paginasVisibles = computed(() => {
    const {actual, totalPaginas} = this.paginacion();
    const maxPaginas = 5;
    const inicio = Math.max(0, actual - Math.floor(maxPaginas / 2));
    const fin = Math.min(totalPaginas - 1, inicio + maxPaginas - 1);

    return Array.from({length: fin - inicio + 1}, (_, i) => inicio + i);
  });

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.loading.set(true);
    const { actual, tamanio } = this.paginacion();

    this.service.loadPedidos(actual, tamanio).subscribe({
      next: (res) => {
        // res ya tiene 'contenido', 'paginaActual', etc.
        const pedidosConFecha = (res.contenido || []).map((p: any) => ({
          ...p,
          fecha: p.fecha ? new Date(p.fecha).toLocaleDateString('es-PE') : ''
        }));

        this.pedidos.set(pedidosConFecha);

        this.paginacion.set({
          actual: res.paginaActual,
          tamanio: res.tamanio,
          totalElementos: res.totalElementos,
          totalPaginas: res.totalPaginas
        });
      },
      error: (error) => console.error('Error al cargar productos:', error),
      complete: () => this.loading.set(false)
    });
  }


  cambiarPagina(nuevaPagina: number) {
    const {totalPaginas} = this.paginacion();

    if (nuevaPagina >= 0 && nuevaPagina < totalPaginas && !this.loading()) {
      this.paginacion.update(p => ({...p, actual: nuevaPagina}));
      this.cargarPedidos();
    }
  }

  trackByPedidoId = (_: number, pedido: Pedido) => pedido.idPedido;
  trackByPagina = (_: number, pagina: number) => pagina;

}
