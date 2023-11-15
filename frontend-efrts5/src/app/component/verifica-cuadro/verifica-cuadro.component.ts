import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseResponse } from 'src/app/modal/base-response';
import { CarritoCompras } from 'src/app/modal/carrito-compras';
import { GenerarOrden } from 'src/app/modal/generar-orden';
import { Usuario } from 'src/app/modal/usuario';
import { CarritoService } from 'src/app/service/carrito/carrito.service';
import { OrdenService } from 'src/app/service/orden/orden.service';
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

  baseResponse! : BaseResponse;
  constructor(private carritoService: CarritoService, private usuarioService : UsuarioService, private ordenService: OrdenService, private snackBar : MatSnackBar
    , private router : Router)
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
    if(this.obtenerProductosCarrito().length === 0)
    {
      let response : BaseResponse = {
        codRespuesta : "1",
        descripcion : "No existen producto en el carrito para realizar la compra.",
        msjRespuesta : "Error"
      }
      this.baseResponse = response;
      this.snackBar.openFromTemplate(this.notificacionError, {
        duration: 3 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    let ordenCompra : GenerarOrden = {
      idUsuario : this.usuario.id,
      detalleCompra : this.obtenerProductosCarrito()
    }
    this.ordenService.realizarVenta(ordenCompra).subscribe({
      next : data =>{
        this.baseResponse = data;
        this.snackBar.openFromTemplate(this.notificacionExito, {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.carritoService.limpiarLocalStorage();
        this.router.navigate(["/"]);
      }, error : error =>{
        this.baseResponse = error.error;
        this.snackBar.openFromTemplate(this.notificacionError, {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    })
  }
}
