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

  private urlApiProductos = BASE_URL + "/productos"


  constructor(private http : HttpClient) { }

  buscarPorPaginado(pagina: number) : Observable<CuadroPaginado>{
    return this.http.get<CuadroPaginado>(`${this.urlApiProductos}/paginas?pagina=${pagina}`);
  }

  buscarPorIdProducto(id: number) : Observable<any>{
    return this.http.get<any>(`${this.urlApiProductos}/${id}`);
  }

  obtenerProducto() : Observable<any>{
    return this.http.get<any>(`${this.urlApiProductos}`);
  }

  obtenerPrimeros3() : Observable<any>{
    return this.http.get<any>(`${this.urlApiProductos}/top-3`);
  }

  buscarPorId(id: number) : Observable<any>{
    return this.http.get<any>(`${this.urlApiProductos}/${id}`);
  }

  registrarProducto(body: any): Observable <any>{
    return this.http.post<any>(`${this.urlApiProductos}`, body);
  }

  actualizarProducto(body: Producto) : Observable<any>{
    return this.http.put<any>(`${this.urlApiProductos}`,body);
  }

  eliminarProducto(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlApiProductos}/${id}`);
  }
}
