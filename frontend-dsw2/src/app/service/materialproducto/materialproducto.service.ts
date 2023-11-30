import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaterialCuadro } from 'src/app/modal/material-cuadro';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class MaterialproductoService {

  private urlApiMateriales = BASE_URL + "/materiales"

  constructor(private http: HttpClient) { }

  obtenerMateriales() {
    return this.http.get<MaterialCuadro[]>(`${this.urlApiMateriales}`);
  }
}
