import { Component, OnInit } from '@angular/core';
import {faHeadset, faTruckFast, faWallet, faGift} from '@fortawesome/free-solid-svg-icons'
import { Cuadro } from 'src/app/modal/cuadro';
import { ProductoService } from 'src/app/service/producto/producto.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  headPhoneIcon = faHeadset;
  truckFastIcon = faTruckFast;
  walletIcon = faWallet;
  giftIcon = faGift;

  productoList : Cuadro[] = [];

  constructor(private productoService : ProductoService){

  }
  ngOnInit(): void {
    this.productoService.obtenerPrimeros3().subscribe(data => this.productoList = data);
  }


}
