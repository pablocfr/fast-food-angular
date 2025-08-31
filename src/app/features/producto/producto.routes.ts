import {Route} from '@angular/router';
import {MainLayoutComponent} from '../../layout/components/main-layout/main-layout';
import {AuthGuard} from '../../core/auth/guards/auth.guard';
import {DashboardComponent} from '../dashboard/dashboard';
import {ProductoComponent} from './components/producto/producto.component';
import {RegistrarProductoComponent} from './components/registrar-producto/registrar-producto.component';
import {CategoriaComponent} from './components/categoria/categoria.component';
import {RegistrarCategoriaComponent} from './components/registrar-categoria/registrar-categoria.component';
import {RegistrarProveedorComponent} from './components/registrar-proveedor/registrar-proveedor.component';
import {ProveedorComponent} from './components/proveedor/proveedor.component';
import {ComboComponent} from './components/combo/combo.component';
import {RegistrarComboComponent} from './components/registrar-combo/registrar-combo.component';
import {PedidoComponent} from './components/pedido/pedido.component';


export const ProductoRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'productos', component: ProductoComponent },
      { path: 'registrarProducto', component: RegistrarProductoComponent },
      { path: 'categorias', component: CategoriaComponent },
      { path: 'registrarCategoria', component: RegistrarCategoriaComponent },
      { path: 'proveedores', component: ProveedorComponent },
      { path: 'registrarProveedor', component: RegistrarProveedorComponent },
      { path: 'combos', component: ComboComponent },
      { path: 'registrarCombo', component: RegistrarComboComponent },
      { path: 'pedidos', component: PedidoComponent }
    ]
  }
];
