import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  loadProductos(paginaActual: number, tamanio: number): Observable<ApiResponseProductos> {
    return this._httpClient.get<ApiResponseProductos>(`${this.baseUrl}/api/productos/paginado?pagina=${paginaActual}&tamanio=${tamanio}`);
  }

  loadPedidos(paginaActual: number, tamanio: number): Observable<ApiResponsePedidos> {
    return this._httpClient.get<ApiResponsePedidos>(`${this.baseUrl}/api/pedidos/paginado?pagina=${paginaActual}&tamanio=${tamanio}`);
  }

  saveProducto(producto: any): Observable<any>{
    return this._httpClient.post<any>(`${this.baseUrl}/api/productos`, producto);
  }

  loadProveedores(): Observable<Proveedor[]> {
    return this._httpClient.get<Proveedor[]>(`${this.baseUrl}/api/proveedores`);
  }

  saveProveedor(proveedor: any): Observable<any>{
    return this._httpClient.post<any>(`${this.baseUrl}/api/proveedores`, proveedor);
  }

  loadCategorias(): Observable<Categoria[]> {
    return this._httpClient.get<Categoria[]>(`${this.baseUrl}/api/categorias`);
  }

  saveCategoria(categoria: any): Observable<any>{
    return this._httpClient.post<any>(`${this.baseUrl}/api/categorias`, categoria);
  }

}
