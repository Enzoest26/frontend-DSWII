import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { NavbarService } from 'src/app/service/navbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm !: FormGroup;

  mostrarError = false;

  constructor(private navbarService : NavbarService, private loginService : LoginService, private formBuilder : FormBuilder, private router: Router)
  {
    if(navbarService.isAutenticado())
    {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  ingresar()
  {
    this.mostrarError = false;
    if(this.loginForm.invalid)
    {
      this.mostrarError = true;
      return;
    }
    let usuario = this.loginForm.value;
    this.loginService.login(usuario).subscribe({
      next: data =>{
        localStorage.setItem("auth", "true");
        localStorage.setItem("tipoUsuario", data.tipoUsuario);
        localStorage.setItem("email", usuario.username)
        this.router.navigate(['/']);
      },
      error: error =>{
        this.navbarService.autenticado = false;
        this.mostrarError = true;
      }
  })
  }

}
