import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private urlApiRegistro = BASE_URL + "/usuarios";

  constructor(private http : HttpClient) { }

  registrarUsuario(body : any) : Observable<any>
  {
    return this.http.post<any>(`${this.urlApiRegistro}`, body);
  }

}
