import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Cuadro } from 'src/app/modal/cuadro';
import { Producto } from 'src/app/modal/producto';
import { CarritoService } from 'src/app/service/carrito/carrito.service';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-vista-previa',
  templateUrl: './vista-previa.component.html',
  styleUrls: ['./vista-previa.component.css']
})
export class VistaPreviaComponent implements OnInit{

  @ViewChild('cantidad') inputRef!: ElementRef;
  @ViewChild('notificacionExito') notificacionExito!: TemplateRef<any>
  @ViewChild('notificacionError') notificacionError!: TemplateRef<any>

  producto! : Producto;

  cantidad : number = 1;

  constructor(private activatedRouter : ActivatedRoute, private carritoService : CarritoService
    , private productoService : ProductoService, private snackBar : MatSnackBar){
  }
  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get("id");
    this.productoService.buscarPorIdProducto(Number(id)).subscribe(data => this.producto = data);
  }

  aniadirCarrito(){
    const cantidad = this.inputRef.nativeElement.value;
    let isAdded = this.carritoService.agregarProducto(this.producto.idProducto
      ,Number(cantidad), this.producto.precio * cantidad, this.producto.nombre);
    
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
    }
    
  }

}
