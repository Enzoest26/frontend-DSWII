import { Component } from '@angular/core';
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
  usuario! : Usuario;
  constructor(private carritoService: CarritoService, private usuarioService : UsuarioService)
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
    this.obtenerProductosCarrito().forEach(data => total += data.precio);
    return total;
  }
}
