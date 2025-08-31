import {Component, inject, OnInit, signal} from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import {Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-categoria',
  imports: [
    DecimalPipe
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

  readonly service = inject(ProductoService);
  readonly router = inject(Router);

  categorias = signal<Categoria[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.cargarCategoria();
  }

  cargarCategoria(){
    this.loading.set(true);
    this.service.loadCategorias().subscribe({
      next: (data) => {
        this.categorias.set(data);
      },
      error: (error) => console.error('Error al cargar categorias:', error),
      complete: () => this.loading.set(false)
    })
  }

  trackByCategoriaId = (_: number, categoria: Categoria) => categoria.idCategoria;

  nuevaCategoria(){
    this.router.navigate(['/admin/registrarCategoria']);
  }
}
