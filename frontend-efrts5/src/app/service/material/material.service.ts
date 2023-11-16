import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from 'src/app/modal/material';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private url = BASE_URL + "/material/listarTodos";

  constructor(private http: HttpClient) { }

  obtenerMaterialProducto() : Observable<Material[]>
  {
    return this.http.get<Material[]>(`${this.url}`);
  }
}
