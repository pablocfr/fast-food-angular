import {Component, inject, OnInit, signal} from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-proveedor',
  imports: [],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent implements OnInit{

  readonly service = inject(ProductoService);
  readonly router = inject(Router);

  proveedores = signal<Proveedor[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(){
    this.loading = signal(true);
    this.service.loadProveedores().subscribe({
      next: (data) => {
        this.proveedores.set(data);
      }
      ,
      error: (error) => console.error('Error al cargar proveedores:', error),
      complete: () => this.loading.set(false)
    })
  }

  trackByProveedorId = (_: number, proveedor: Proveedor) => proveedor.idProveedor;

  nuevoProveedor(){
    this.router.navigate(['/admin/registrarProveedor']);
  }
}
