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

  private urlApiUsuarios = BASE_URL + "/usuarios";

  constructor(private http : HttpClient) { }

  obtenerUsuario() : Observable<any>{
    return this.http.get<any>(`${this.urlApiUsuarios}`);
  }

  buscarPorId(id: number) : Observable<any>{
    return this.http.get<any>(`${this.urlApiUsuarios}/${id}`);
  }

  actualizarUsuario(body: Usuario) : Observable<any>{
    return this.http.put<any>(`${this.urlApiUsuarios}`,body);
  }

  eliminarUsuario(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlApiUsuarios}/${id}`);
  }

  buscarPorEmail(email: string) : Observable<any>{
    return this.http.get<any>(`${this.urlApiUsuarios}/email?email=${email}`)
  }

  registrarUser(body: any): Observable <any>{
    return this.http.post<any>(`${this.urlApiUsuarios}`, body);
  }
  
}
