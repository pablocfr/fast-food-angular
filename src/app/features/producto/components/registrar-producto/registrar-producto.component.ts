import {Component, inject, signal} from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-registrar-producto',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css'
})
export class RegistrarProductoComponent {

  readonly _productoService = inject(ProductoService);

  productoForm: FormGroup;
  categoria: any[] = [];
  proveedor: any[] = [];
  mensajeError = signal("");

  constructor(
    readonly fb: FormBuilder,
    readonly router: Router,
  ) {
    this.listarCategorias();
    this.listarProveedores();
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      requiereCocina: ['', [Validators.required]],
      categoriaId: [1],
      proveedorId: [1]
    })
  }

  listarCategorias(): void {
    this._productoService.loadCategorias().subscribe({
      next: categoria => this.categoria = categoria,
      error: err => console.error('Error al cargar categorias', err),
      complete: () => console.log('Categorias cargadas')
    })
  }

  listarProveedores(): void {
    this._productoService.loadProveedores().subscribe({
      next: proveedor => this.proveedor = proveedor,
      error: err => console.error('Error al cargar categorias', err),
      complete: () => console.log('Categorias cargadas')
    })
  }

  onSubmit() {
    if (this.productoForm.invalid) return;

    this._productoService.saveProducto(this.productoForm.value)
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            console.log(resp.message);
            this.router.navigate(['/admin/productos']);
          } else {
            // Si el backend respondió success=false
            this.mensajeError.set(resp.message);
          }
        },
        error: (error) => {
          console.error('Error inesperado al registrar producto', error);
          this.mensajeError.set('Ocurrió un error inesperado');
        },
        complete: () => console.log('Petición finalizada')
      });
  }


  onCancel() {
    this.router.navigate(['/admin/productos']);
  }

}
