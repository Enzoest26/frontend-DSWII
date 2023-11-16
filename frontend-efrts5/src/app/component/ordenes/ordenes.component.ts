import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/service/ordenes/ordenes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit{

  ordenes: any[] = [];
  selectedOrder: any;

  constructor(private ordenesService: OrdenesService, private modalService: NgbModal) { }

   ngOnInit(): void {
    this.ordenesService.obtenerOrdenes().subscribe(data => {
      this.ordenes = data;
    });
  }

  verDetalles(orden: any, content: any) {
    if (orden) {
      console.log('Detalles de la orden:', orden);
      this.selectedOrder = orden;
      this.modalService.open(content, { size: 'md' });
    } else {
      console.error('No se encontró la orden con el id:');
    }
  }
}
