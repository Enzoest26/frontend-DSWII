import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/modal/color';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private urlApiColores = BASE_URL + "/colores";

  constructor(private http: HttpClient) { }

  obtenerColorProducto() : Observable<Color[]>
  {
    return this.http.get<Color[]>(`${this.urlApiColores}`);
  }
}
