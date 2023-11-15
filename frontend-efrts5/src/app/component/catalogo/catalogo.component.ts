import { Component, OnInit } from '@angular/core';
import { Cuadro } from 'src/app/modal/cuadro';
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

  constructor(private usuarioService: UsuarioService)  {
  }
  ngOnInit(): void {
    this.usuarioService.buscarPorPaginado(this.paginaActual).subscribe(data => {
      this.productosDatos = data.content;
      this.paginaFinal = data.totalPages;
    });
  }

  clickSiguiente(){
    this.productosDatos = [];
    this.paginaActual += 1;
    this.usuarioService.buscarPorPaginado(this.paginaActual).subscribe(data => {
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
    
    this.usuarioService.buscarPorPaginado(this.paginaActual).subscribe(data => {
      this.productosDatos = data.content;
      this.paginaFinal = data.totalPages;
    });
  }



}
