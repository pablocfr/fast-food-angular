import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductoService} from '../../services/producto.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-registrar-categoria',
  imports: [ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './registrar-categoria.component.html',
  styleUrl: './registrar-categoria.component.css'
})
export class RegistrarCategoriaComponent {

  readonly _productoService = inject(ProductoService);

  categoriaForm: FormGroup;
  mensajeError = signal("");

  constructor(
    readonly fb: FormBuilder,
    readonly router: Router,
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.categoriaForm.invalid) return;

    this._productoService.saveCategoria(this.categoriaForm.value)
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            console.log(resp.message);
            this.router.navigate(['/admin/categorias']);
          } else {
            this.mensajeError.set(resp.message);
          }
        },
        error: (err) => {
          console.error('Error al guardar categoria', err);
          this.mensajeError.set('Error al guardar categoria');
        },
        complete: () => console.log('Petición para guardar categoria completada')
      })
  }

  onCancel(){
    this.router.navigate(['/admin/categorias']);
  }
}
