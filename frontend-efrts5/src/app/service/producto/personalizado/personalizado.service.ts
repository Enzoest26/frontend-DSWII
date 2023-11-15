import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class PersonalizadoService {

  private urlRegistrarCuadroPersonalizado = BASE_URL + "/producto/personalizado";

  constructor(private http: HttpClient) { }

  registrarCuadroPersonalizado(body: any): Observable<any> {
    return this.http.post<any>(`${this.urlRegistrarCuadroPersonalizado}`, body);
  }
}
