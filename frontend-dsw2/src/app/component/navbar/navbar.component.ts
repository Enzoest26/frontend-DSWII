import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/service/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public navbarService: NavbarService, private router : Router)
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

  isAdmin() : Boolean{
    let tipoUsuario = localStorage.getItem("tipoUsuario");
    return tipoUsuario == "ADMIN" ? true : false;
  }

  cerrarSesion() {
    localStorage.removeItem("auth");
    localStorage.removeItem("tipoUsuario");
    this.router.navigate(['/']);
  }
}
