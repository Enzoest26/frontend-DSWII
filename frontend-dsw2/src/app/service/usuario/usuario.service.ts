import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuadro } from 'src/app/modal/cuadro';
import { CuadroPaginado } from 'src/app/modal/cuadro-paginado';
import { Usuario } from 'src/app/modal/usuario';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private pathUsuarios = BASE_URL + "/usuarios";
  /*
  private urlBuscarPodId = BASE_URL + "/usuario/buscarPorId";
  private urlEliminar = BASE_URL + "/usuario/eliminar";
  private urlActualizar = BASE_URL + "/usuario/actualizar";
  private urlBuscarPorEmail = BASE_URL + "/usuario/buscarPorEmail";
  private urlRegistrarUser = BASE_URL + "/usuario/registrar";
  */
  constructor(private http : HttpClient) { }

  obtenerUsuario() : Observable<any>{
    return this.http.get<any>(`${this.pathUsuarios}`);
  }

  buscarPorId(id: number) : Observable<any>{
    return this.http.get<any>(`${this.pathUsuarios}/${id}`);
  }

  actualizarUsuario(body: Usuario) : Observable<any>{
    return this.http.put<any>(`${this.pathUsuarios}`,body);
  }

  eliminarUsuario(id: number): Observable<any>{
    return this.http.delete<any>(`${this.pathUsuarios}/${id}`);
  }

  buscarPorEmail(email: string) : Observable<any>{
    return this.http.get<any>(`${this.pathUsuarios}/email?email=${email}`)
  }

  registrarUser(body: any): Observable <any>{
    return this.http.post<any>(`${this.pathUsuarios}`, body);
  }
  
}
