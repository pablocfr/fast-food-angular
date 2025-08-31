import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-fecha-hora',
  template: `
    <p class="font-semibold">📅 Fecha: {{ fecha }}</p>
    <p class="font-semibold">🕒 Hora: {{ hora }}</p>
  `
})
export class FechaHoraComponent implements OnInit, OnDestroy {
  fecha: string = '';
  hora: string = '';
  private intervalId: any;

  ngOnInit(): void {
    this.actualizarFechaHora(); // primera carga

    // actualizar cada segundo
    this.intervalId = setInterval(() => {
      this.actualizarFechaHora();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private actualizarFechaHora(): void {
    const ahora = new Date();

    // Fecha: dd/MM/yyyy
    this.fecha = ahora.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Lima'
    });

    // Hora: HH:mm:ss
    this.hora = ahora.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Lima'
    });
  }

}
