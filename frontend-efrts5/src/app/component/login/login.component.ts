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

  constructor(private navbarService : NavbarService, private loginService : LoginService, private formBuilder : FormBuilder, private router: Router)
  {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  ingresar()
  {
    if(this.loginForm.invalid)
    {
      console.log("Invalido");
      return;
    }
    let usuario = this.loginForm.value;
    console.log(usuario);
    
    this.loginService.login(usuario).subscribe({next: data =>{
      console.log(data);
      this.navbarService.autenticado = true;
      if(data.tipoUsuario == 'ADMIN')
      {
        this.navbarService.isAdmin = true;
      }else
      {
        this.navbarService.isUser = true;
      }
      this.router.navigate(['/']);

    }})
  }
}
