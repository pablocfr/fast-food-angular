import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PantallaService {

  readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  loadPedidosEntregados(): Observable<ApiResponsePedidos> {
    return this._httpClient.get<ApiResponsePedidos>(`${this.baseUrl}/api/pedidos/entregados`);
  }

  loadPedidosCompletados(): Observable<ApiResponsePedidos> {
    return this._httpClient.get<ApiResponsePedidos>(`${this.baseUrl}/api/pedidos/completados`);
  }

  loadPedidosPreparacion(): Observable<ApiResponsePedidos> {
    return this._httpClient.get<ApiResponsePedidos>(`${this.baseUrl}/api/pedidos/preparacion`);
  }

  loadPedidosPorEstado(estado: string): Observable<Pedido[]> {
    return this._httpClient.get<Pedido[]>(`${this.baseUrl}/api/pedidos/estado/${estado}`);
  }

  cambiarEstadoPedido(id: number) {
    return this._httpClient.patch(`${this.baseUrl}/api/pedidos/${id}`, {});
  }

}
