import { Component } from '@angular/core';
import { CarritoCompras } from 'src/app/modal/carrito-compras';
import { Cuadro } from 'src/app/modal/cuadro';
import { CarritoService } from 'src/app/service/carrito/carrito.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent {

  constructor(private carritoService : CarritoService)
  {
  }

  obtenerProductosCarrito() : CarritoCompras[]
  {
    return this.carritoService.obtenerTodoCarrito();
  }

  eliminarProducto(id: number){
    this.carritoService.eliminarProducto(id);
  }

  calcularTotalPagar() : number
  {
    let total = 0;
    this.obtenerProductosCarrito().forEach(data => total += (data.precio * data.cantidad));
    return total;
  }
}
