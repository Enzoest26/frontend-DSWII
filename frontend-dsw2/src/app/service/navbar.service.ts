import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public autenticado : Boolean = false;
  public isAdmin: Boolean = false;
  public isUser: Boolean = false;
  constructor() { }

  isAutenticado() : Boolean
  {
    console.log("Auenticado: " + this.autenticado);
    return this.autenticado;
  }

  isAdministrador() : Boolean
  {
    console.log("Es Administrador: " + this.autenticado);
    return this.isAdmin;
  }

  isUsuario() : Boolean
  {
    console.log("Es Usuario: " + this.autenticado);
    return this.isUser;
  }
}
