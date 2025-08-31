import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import {DecimalPipe} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-producto',
  imports: [
    DecimalPipe
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {

  Math= Math;

  readonly service = inject(ProductoService);
  readonly router = inject(Router);

  productos = signal<Producto[]>([]);
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

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.loading.set(true);
    const { actual, tamanio } = this.paginacion();

    this.service.loadProductos(actual, tamanio).subscribe({
      next: (res) => {
        // res ya tiene 'contenido', 'paginaActual', etc.
        this.productos.set(res.contenido || []);
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
      this.cargarProductos();
    }
  }

  // TrackBy functions
  trackByProductoId = (_: number, producto: Producto) => producto.idProducto;
  trackByPagina = (_: number, pagina: number) => pagina;

  nuevoProducto(){
    this.router.navigate(['/admin/registrarProducto']);
  }
}
