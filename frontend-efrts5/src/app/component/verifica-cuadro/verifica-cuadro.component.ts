import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarritoCompras } from 'src/app/modal/carrito-compras';
import { Usuario } from 'src/app/modal/usuario';
import { CarritoService } from 'src/app/service/carrito/carrito.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-verifica-cuadro',
  templateUrl: './verifica-cuadro.component.html',
  styleUrls: ['./verifica-cuadro.component.css']
})
export class VerificaCuadroComponent {
  @ViewChild('notificacionExito') notificacionExito!: TemplateRef<any>
  @ViewChild('notificacionError') notificacionError!: TemplateRef<any>
  usuario! : Usuario;
  constructor(private carritoService: CarritoService, private usuarioService : UsuarioService, private snackBar : MatSnackBar)
  {
    this.usuarioService.buscarPorEmail(localStorage.getItem("email")!).subscribe(data=> this.usuario = data);
  }

  obtenerProductosCarrito() : CarritoCompras[]
  {
    return this.carritoService.obtenerTodoCarrito();
  }

  calcularTotalPagar() : number
  {
    let total = 0;
    this.obtenerProductosCarrito().forEach(data => total += (data.precio * data.cantidad));
    return total;
  }

  generarOrden(){
    console.log(this.carritoService.obtenerTodoCarrito());
/*
    if(isAdded == false){
      this.snackBar.openFromTemplate(this.notificacionError, {
        duration: 3 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }else{
      this.snackBar.openFromTemplate(this.notificacionExito, {
        duration: 3 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }*/
  }
}
