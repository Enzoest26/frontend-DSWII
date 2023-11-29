import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class PersonalizadoService {

  private pathProductoPersonalizado = BASE_URL + "/productos/personalizado";
  private urlBuscarPorId = BASE_URL + "/productos/buscarPorId"
/*
  private urlRegistrarCuadroPersonalizado = BASE_URL + "/productos/personalizado";
  private urlActualizarCuadroPersonalizado = BASE_URL + "/productos/personalizado";
*/

  constructor(private http: HttpClient) { }

  registrarCuadroPersonalizado(body: any): Observable<any> {
    return this.http.post<any>(`${this.pathProductoPersonalizado}`, body);
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBuscarPorId}/${id}`);
  }

  actualizarCuadroPersonalizado(id: number, body: any) {
    return this.http.put<any>(`${this.pathProductoPersonalizado}/${id}`, body);
  }
}
