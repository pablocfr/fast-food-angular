import {Route} from '@angular/router';
import {EsperaComponent} from './components/espera/espera.component';
import {CocinaComponent} from './components/cocina/cocina.component';
import {DespachoComponent} from './components/despacho/despacho.component';
import {CajaComponent} from './components/caja/caja.component';

export const PantallaRoutes: Route[] = [
  {
    path: 'espera',
    component: EsperaComponent
  },
  {
    path: 'cocina',
    component: CocinaComponent
  },
  {
    path: 'despacho',
    component: DespachoComponent
  },
  {
    path: 'caja',
    component: CajaComponent
  }
];
