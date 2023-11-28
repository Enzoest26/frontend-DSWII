import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuadro } from 'src/app/modal/cuadro';
import { CuadroPaginado } from 'src/app/modal/cuadro-paginado';
import { Producto } from 'src/app/modal/producto';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private pathProductos = BASE_URL + "/productos"

  /*
  private urlBuscarPorPaginado = BASE_URL + "/producto/buscarPorPagina";
  private urlBuscarPorIdProducto = BASE_URL + "/producto/buscarPorId";
  private urlListarTodos = BASE_URL + "/producto/listarTodos";
  private urlBuscarPorId = BASE_URL + "/producto/buscarPorId";
  private urlEliminar = BASE_URL + "/producto/eliminar";
  private urlActualizar = BASE_URL + "/producto/actualizar";
  private urlRegistrar = BASE_URL + "/producto/registrar";
  private urlObtenerPrimeros3 = BASE_URL + "/producto/primeros-3";
  */

  constructor(private http : HttpClient) { }

  buscarPorPaginado(pagina: number) : Observable<CuadroPaginado>{
    return this.http.get<CuadroPaginado>(`${this.pathProductos}?pagina=${pagina}`);
  }

  buscarPorIdProducto(id: number) : Observable<any>{
    return this.http.get<any>(`${this.pathProductos}/${id}`);
  }

  obtenerProducto() : Observable<any>{
    return this.http.get<any>(`${this.pathProductos}`);
  }

  obtenerPrimeros3() : Observable<any>{
    return this.http.get<any>(`${this.pathProductos}`);
  }

  buscarPorId(id: number) : Observable<any>{
    return this.http.get<any>(`${this.pathProductos}/${id}`);
  }

  registrarProducto(body: any): Observable <any>{
    return this.http.post<any>(`${this.pathProductos}`, body);
  }

  actualizarProducto(body: Producto) : Observable<any>{
    return this.http.put<any>(`${this.pathProductos}`,body);
  }

  eliminarProducto(id: number): Observable<any>{
    return this.http.delete<any>(`${this.pathProductos}/${id}`);
  }
}
