import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/util/constantes';
import { ColorCuadro } from 'src/app/modal/color-cuadro';

@Injectable({
  providedIn: 'root'
})
export class ColorproductoService {

  private urlApiColores = BASE_URL + "/colores"

  constructor(private http: HttpClient) { }

  obtenerColores() {
    return this.http.get<ColorCuadro[]>(`${this.urlApiColores}`);
  }
}
