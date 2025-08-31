import {
  Component,
  HostListener,
  signal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../../core/auth/service/auth.service';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

interface UserMenuItem {
  label: string;
  icon: string;
  route?: string;
  danger?: boolean;
  dividerAbove?: boolean;
  action?: () => void;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.html'
})
export class MainLayoutComponent {
  sidebarOpen = signal(false);
  userMenuOpen = signal(false);

  navItems = signal<NavItem[]>([
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: 'M3 3h6v18H3V3Zm12 0h6v10h-6V3Zm0 12h6v6h-6v-6Z'
    },
    {
      label: 'Categorias',
      path: '/admin/categorias',
      icon: 'M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.4 0-8 2.24-8 5v3h16v-3c0-2.76-3.6-5-8-5Z'
    },
    {
      label: 'Productos',
      path: '/admin/productos',
      icon: 'M4 6l8-4 8 4v12l-8 4-8-4V6Zm8-2.3L6 7v10l6 3 6-3V7l-6-3.3Z'
    },
    {
      label: 'Combos',
      path: '/admin/combos',
      icon: 'M4 9h16a2 2 0 0 1 2 2v1H2v-1a2 2 0 0 1 2-2Zm-2 5h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2Zm4-9h12a2 2 0 0 1 2 2v1H4v-1a2 2 0 0 1 2-2Z'
    },
    {
      label: 'Proveedores',
      path: '/admin/proveedores',
      icon: 'M3 4h11v10H3V4Zm13 2h3l3 4v4h-6V6Zm-9 14a2 2 0 1 0-2-2 2 2 0 0 0 2 2Zm10 0a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z'
    },
    {
      label: 'Pedidos',
      path: '/admin/pedidos',
      icon: 'M3 4h2l3 9h10l3-6H8m-1 13a2 2 0 1 0 2-2 2 2 0 0 0-2 2Zm8 0a2 2 0 1 0 2-2 2 2 0 0 0-2 2Z'
    }
  ]);

  userMenuItems: UserMenuItem[] = [
    {
      label: 'Ver Perfil',
      icon: 'M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5.33 0-8 2.67-8 6v2h16v-2c0-3.33-2.67-6-8-6Z',
      route: '/profile'
    },
    {label: 'Configuración', icon: 'M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4Z', route: '/settings', dividerAbove: true},
    {
      label: 'Cerrar Sesión',
      icon: 'M16 13H7v-2h9V8l5 4-5 4v-3Z',
      danger: true,
      dividerAbove: true,
      action: () => this.logout()
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }

  toggleUserMenu() {
    this.userMenuOpen.update(v => !v);
  }

  closeUserMenu() {
    this.userMenuOpen.set(false);
  }

  handleMenuItem(item: UserMenuItem) {
    if (item.action) {
      item.action();
    }
    this.closeUserMenu();
  }

  logout() {
    const success = this.authService.signOut();
    if (success) {
      console.log('Sesión cerrada exitosamente');
      this.router.navigate(['/auth/login']);
    } else {
      console.error('Error al cerrar sesión');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.closeUserMenu();
    }
  }

}
