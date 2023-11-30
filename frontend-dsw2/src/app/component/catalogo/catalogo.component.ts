import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuadro } from 'src/app/modal/cuadro';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{

  paginaActual : number = 1;
  paginaFinal!: number;
  productosDatos : Cuadro[] = [];

  constructor(private productoService: ProductoService, private router: Router)  {
  }
  ngOnInit(): void {
    this.productoService.buscarPorPaginado(this.paginaActual).subscribe(data => {
      this.productosDatos = data.content;
      this.paginaFinal = data.totalPages;
    });
  }

  clickSiguiente(){
    this.productosDatos = [];
    this.paginaActual += 1;
    this.productoService.buscarPorPaginado(this.paginaActual).subscribe(data => {
      this.productosDatos = data.content;
      this.paginaFinal = data.totalPages;
    });
  }

  clickAnterior(){
    this.productosDatos = [];
    if(this.paginaActual == 1){
      return;
    }
    this.paginaActual -= 1;
    
    this.productoService.buscarPorPaginado(this.paginaActual).subscribe(data => {
      this.productosDatos = data.content;
      this.paginaFinal = data.totalPages;
    });
  }

  irVistaPrevia(id: number){
    this.router.navigate(['vista-previa', id]);
  }



}
