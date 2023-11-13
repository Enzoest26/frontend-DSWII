import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private urlRegistro = BASE_URL + "/usuario/registrar";

  constructor(private http : HttpClient) { }

  registrarUsuario(body : any) : Observable<any>
  {
    return this.http.post<any>(`${this.urlRegistro}`, body);
  }

}
