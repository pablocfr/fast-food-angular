import { Routes } from '@angular/router';
import {MainLayoutComponent} from './layout/components/main-layout/main-layout';
import {AuthGuard} from './core/auth/guards/auth.guard';
import {DashboardComponent} from './features/dashboard/dashboard';
import {InicioComponent} from './features/inicio/inicio.component/inicio.component';
import {ProductoComponent} from './features/producto/components/producto/producto.component';
import {
  RegistrarProductoComponent
} from './features/producto/components/registrar-producto/registrar-producto.component';
import {CategoriaComponent} from './features/producto/components/categoria/categoria.component';

export const routes: Routes = [
  // 👇 Ruta protegida pero sin layout
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'pantalla',
    loadChildren: () =>
      import('./features/pantalla/pantalla.routes').then(
        m => m.PantallaRoutes
      )
  },

  // 👇 Rutas con layout solo en admin
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/producto/producto.routes').then(
        m => m.ProductoRoutes
      )
  },

  // 👇 Rutas libres de login
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then(
        m => m.AUTH_ROUTES
      )
  },
  {path: '**', redirectTo: ''}
];
