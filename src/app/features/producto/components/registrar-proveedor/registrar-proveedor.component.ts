import {Component, inject, signal} from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-registrar-proveedor',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './registrar-proveedor.component.html',
  styleUrl: './registrar-proveedor.component.css'
})
export class RegistrarProveedorComponent {

  readonly _productoService = inject(ProductoService);

  proveedorForm: FormGroup;
  mensajeError = signal("");

  constructor(
    readonly fb: FormBuilder,
    readonly router: Router
  ) {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      contacto: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.proveedorForm.invalid) return;

    this._productoService.saveProveedor(this.proveedorForm.value)
      .subscribe({
        next: (resp) => {
          if(resp.success){
            console.log(resp.message);
            this.router.navigate(['/admin/productos']);
          } else {
            this.mensajeError.set(resp.message);
          }
        },
        error: (err) => {
          console.error('Error al guardar proveedor', err);
          this.mensajeError.set('Error al guardar proveedor');
        },
        complete: () => console.log('Petición para guardar proveedor completada')
      })
  }

  onCancel(){
    this.router.navigate(['/admin/productos'])
  }

}
