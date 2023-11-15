import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuadro } from 'src/app/modal/cuadro';
import { CuadroPaginado } from 'src/app/modal/cuadro-paginado';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http : HttpClient) { }
  private urlBuscarPorPaginado = BASE_URL + "/producto/buscarPorPagina";
  private urlBuscarPorIdProducto = BASE_URL + "/producto/buscarPorId";
  buscarPorPaginado(pagina: number) : Observable<CuadroPaginado>{
    return this.http.get<CuadroPaginado>(`${this.urlBuscarPorPaginado}?pagina=${pagina}`);
  }

  buscarPorIdProducto(id: number) : Observable<Cuadro>{
    return this.http.get<Cuadro>(`${this.urlBuscarPorIdProducto}/${id}`);
  }
}
