import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlListarTodos = BASE_URL + "/usuario/listarTodos";
  private urlBuscarPodId = BASE_URL + "/usuario/buscarPorId";
  private urlEliminar = BASE_URL + "/usuario/eliminar"
  constructor(private http : HttpClient) { }

  obtenerUsuario() : Observable<any>{
    return this.http.get<any>(`${this.urlListarTodos}`);
  }

  buscarPorId(id: number) : Observable<any>{
    return this.http.get<any>(`${this.urlBuscarPodId}/${id}`);
  }

  eliminarUsuario(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEliminar}/${id}`);
  }
}
