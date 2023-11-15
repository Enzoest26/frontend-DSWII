import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RegistroComponent } from './component/registro/registro.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { CarritoComprasComponent } from './component/carrito-compras/carrito-compras.component';
import { VerificaCuadroComponent } from './component/verifica-cuadro/verifica-cuadro.component';
import { CatalogoComponent } from './component/catalogo/catalogo.component';
import { VistaPreviaComponent } from './component/vista-previa/vista-previa.component';
import { PersonalizadoComponent } from './component/producto/personalizado/personalizado.component';

const routes: Routes = [
  {path: '', component: NavbarComponent, children: [
    {path: '', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'usuarios', component: UsuarioComponent},
    {path: 'carrito-compras', component: CarritoComprasComponent},
    {path: 'verifica-cuadro', component: VerificaCuadroComponent},
    {path: 'catalogo', component: CatalogoComponent},
    {path: 'vista-previa/:id', component: VistaPreviaComponent},
    {path: 'personalizado', component: PersonalizadoComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
