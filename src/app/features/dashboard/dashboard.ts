import {Component, computed, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatosService} from '../producto/services/datos.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-8">
      <!-- Header -->
      <div class="bg-gradient-to-r from-red-500 to-yellow-400 rounded-3xl p-6 text-white shadow-2xl">
        <h1 class="text-3xl font-extrabold drop-shadow-lg">🍔 Dashboard FastFood</h1>
        <p class="text-lg font-medium opacity-90 mt-2 drop-shadow">
          ¡Bienvenido al panel de administración! Gestiona tu negocio desde aquí
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-3xl p-6 shadow-2xl border hover:shadow-xl hover:transform hover:scale-[1.02] transition-all duration-300">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl text-white shadow-lg">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <div class="text-sm font-semibold text-gray-500">Pedidos Pendientes</div>
              <div class="text-2xl font-extrabold text-gray-800">{{totalCompletados()}}</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-2xl border hover:shadow-xl hover:transform hover:scale-[1.02] transition-all duration-300">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl text-white shadow-lg">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <div class="text-sm font-semibold text-gray-500">Ventas</div>
              <div class="text-2xl font-extrabold text-gray-800">$12,450</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-2xl border hover:shadow-xl hover:transform hover:scale-[1.02] transition-all duration-300">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl text-white shadow-lg">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div>
              <div class="text-sm font-semibold text-gray-500">Clientes</div>
              <div class="text-2xl font-extrabold text-gray-800">16</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-2xl border hover:shadow-xl hover:transform hover:scale-[1.02] transition-all duration-300">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl text-white shadow-lg">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <div>
              <div class="text-sm font-semibold text-gray-500">Productos</div>
              <div class="text-2xl font-extrabold text-gray-800">10</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-3xl p-6 shadow-2xl">
        <h2 class="text-xl font-bold text-gray-800 mb-6">🚀 Acciones Rápidas</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button routerLink="/pantalla/caja" class="p-4 rounded-2xl bg-gradient-to-r from-red-50 to-yellow-50 border border-red-100 hover:from-red-100 hover:to-yellow-100 hover:shadow-lg transition-all duration-300 text-left">
            <div class="text-lg font-bold text-gray-800">📋 Nuevo Pedido</div>
            <div class="text-sm text-gray-600 mt-1">Crear un pedido rápidamente</div>
          </button>

          <button routerLink="/pantalla/cocina" class="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:from-blue-100 hover:to-indigo-100 hover:shadow-lg transition-all duration-300 text-left">
            <div class="text-lg font-bold text-gray-800">👥 Ver pantalla de espera</div>
            <div class="text-sm text-gray-600 mt-1">Verificar cantidad de pedidos en espera</div>
          </button>

          <button routerLink="/pantalla/cocina" class="p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 hover:from-green-100 hover:to-emerald-100 hover:shadow-lg transition-all duration-300 text-left">
            <div class="text-lg font-bold text-gray-800">📊 Ver pantalla de cocina</div>
            <div class="text-sm text-gray-600 mt-1" >Verificar cantidad de pedidos en preparación</div>
          </button>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-3xl p-6 shadow-2xl">
        <h2 class="text-xl font-bold text-gray-800 mb-6">⚡ Actividad Reciente</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4 p-3 rounded-2xl bg-gray-50">
            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <div class="flex-1">
              <div class="font-semibold text-gray-800">Pedido #12345 completado</div>
              <div class="text-sm text-gray-500">Hace 5 minutos</div>
            </div>
          </div>

          <div class="flex items-center gap-4 p-3 rounded-2xl bg-gray-50">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              +
            </div>
            <div class="flex-1">
              <div class="font-semibold text-gray-800">Nuevo empleado registrado</div>
              <div class="text-sm text-gray-500">Hace 2 horas</div>
            </div>
          </div>

          <div class="flex items-center gap-4 p-3 rounded-2xl bg-gray-50">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              📦
            </div>
            <div class="flex-1">
              <div class="font-semibold text-gray-800">Inventario actualizado</div>
              <div class="text-sm text-gray-500">Hace 4 horas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit{

  readonly datosService = inject(DatosService)

  totalCompletados = computed(() => this.datosService.pedidosCompletados().length);

  ngOnInit(): void {
    console.log(this.datosService.pedidosCompletados());
  }
}
