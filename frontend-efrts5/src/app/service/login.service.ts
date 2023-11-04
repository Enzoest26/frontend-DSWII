import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../util/constantes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlLogin = BASE_URL + "/login";
  constructor(private http : HttpClient) { }

  login(body : any) : Observable<any>{
    return this.http.post<any>(`${this.urlLogin}`, body);
  }

  

}
