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

  private urlBuscarPorPaginado = BASE_URL + "/producto/buscarPorPagina";
  private urlBuscarPorIdProducto = BASE_URL + "/producto/buscarPorId";
  private urlListarTodos = BASE_URL + "/producto/listarTodos";
  private urlBuscarPorId = BASE_URL + "/producto/buscarPorId";
  private urlEliminar = BASE_URL + "/producto/eliminar";
  private urlActualizar = BASE_URL + "/producto/actualizar";
  private urlRegistrar = BASE_URL + "/producto/registrar";

  constructor(private http : HttpClient) { }

  buscarPorPaginado(pagina: number) : Observable<CuadroPaginado>{
    return this.http.get<CuadroPaginado>(`${this.urlBuscarPorPaginado}?pagina=${pagina}`);
  }

  buscarPorIdProducto(id: number) : Observable<Cuadro>{
    return this.http.get<Cuadro>(`${this.urlBuscarPorIdProducto}/${id}`);
  }

  obtenerProducto() : Observable<any>{
    return this.http.get<any>(`${this.urlListarTodos}`);
  }

  buscarPorId(id: number) : Observable<any>{
    return this.http.get<any>(`${this.urlBuscarPorId}/${id}`);
  }

  registrarProducto(body: any): Observable <any>{
    return this.http.post<any>(`${this.urlRegistrar}`, body);
  }

  actualizarProducto(body: Producto) : Observable<any>{
    return this.http.put<any>(`${this.urlActualizar}`,body);
  }

  eliminarProducto(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEliminar}/${id}`);
  }
}
