import { Component } from '@angular/core';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public navbarService: NavbarService)
  {
    console.log(this.isAutenticado())
  }

  isAutenticado() : Boolean
  {
    let isAuth = localStorage.getItem("auth");
    if(isAuth == "true")
    {
      return true;
    }
    else{
      return false;
    }
  }

  cerrarSesion() {
    localStorage.removeItem("auth");
    localStorage.removeItem("tipoUsuario");
  }
}
