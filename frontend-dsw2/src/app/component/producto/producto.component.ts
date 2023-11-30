import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { Observable, ReplaySubject } from 'rxjs';
import { BaseResponse } from 'src/app/modal/base-response';
import { Color } from 'src/app/modal/color';
import { Material } from 'src/app/modal/material';
import { Producto } from 'src/app/modal/producto';
import { ColorService } from 'src/app/service/color/color.service';
import { MaterialService } from 'src/app/service/material/material.service';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { BOTON_ACTUALIZAR, BOTON_REGISTRAR, EXTENSIONES_PERMITIDAS_IMG, TITULO_ERROR_NOTIFICACION, TITULO_EXITO_NOTIFICACION } from 'src/app/util/constantes';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  @ViewChild("modalMantenimiento") modalMantenimiento! : TemplateRef<any>
  @ViewChild("modalEliminar") modalEliminar! : TemplateRef<any>
  @ViewChild("toast") toast! : NgbToast
  @ViewChild('dialogEliminar') dialogEliminar!: TemplateRef<any>
  @ViewChild('notificacion') notificacion!: TemplateRef<any>

  productosData! : Producto[];

  colores! : Color[];

  materiales! : Material[];

  productoForm! : FormGroup;

  dataProducto: MatTableDataSource<Producto>;

  submited : Boolean = true;
  indActualizar : Boolean = false;
  idEliminar?: number;
  idActualizar?: number;
  mostrarToast: boolean = false;
  baseResponse? : BaseResponse;
  tituloNotificacion ?: string;
  tipoModal? : number; // 0 REGISTRAR, 1 ACTUALIZAR
  tituloBoton? : string;

  constructor(private productoService : ProductoService, private colorService: ColorService, private materialService: MaterialService
    ,private modalService: NgbModal, private formBuilder : FormBuilder, private dialog : MatDialog
    ,private snackBar : MatSnackBar ){
    this.productoForm = formBuilder.group({
      cantidad: ['', Validators.required],
      descripcion: ['', Validators.required],
      nombre: ['', Validators.required],
      //imagen: ['', Validators.required],
      precio: ['', Validators.required],
      color: ['', Validators.required],
      material: ['', Validators.required]
    });
    this.dataProducto = new MatTableDataSource<Producto>([]);
  }
  ngOnInit(): void {
    this.productoService.obtenerProducto().subscribe(data => this.productosData = data);
    this.colorService.obtenerColorProducto().subscribe(data => this.colores = data);
    this.materialService.obtenerMaterialProducto().subscribe(data => this.materiales = data);
    console.log(this.colores);
    console.log(this.materiales);
  }

  abrirMantenimientoActualizar(id: number)
  {
    this.productoForm.reset();
    this.productoService.buscarPorId(id).subscribe({
      next: data =>{
        this.productoForm.patchValue({
          cantidad : data.cantidad,
          descripcion : data.descripcion,
          nombre : data.nombre,
          precio : data.precio,
          color : data.color.id,
          material : data.material.id
        });
        this.idActualizar = id;
      }
    });
    this.indActualizar = true;
    this.dialog.open(this.modalMantenimiento, {width: '500px', height: '800px'});
    this.tituloBoton = BOTON_ACTUALIZAR + ' PRODUCTO';
    this.tipoModal = 1;
  }
  
  cerrarMantenimiento()
  {
    this.modalService.dismissAll();
  }
  abrirModalEliminar(id: number)
  {
    this.idEliminar = id;
    this.dialog.open(this.dialogEliminar);
  }

  accionEliminar()
  {
    this.productoService.eliminarProducto(this.idEliminar!).subscribe({next: data =>{
      this.actualizarTabla();
      
    }, error: error =>{
      this.baseResponse = error.error;
      this.mostrarToast = true;
      this.mostrarNotificacionError();
    }})
  }

  actualizarTabla()
  {
    this.productosData = [];
    this.colores = [];
    this.materiales = [];
    this.productoService.obtenerProducto().subscribe(data => this.productosData = data);
    this.colorService.obtenerColorProducto().subscribe(data => this.colores = data);
    this.materialService.obtenerMaterialProducto().subscribe(data => this.materiales = data);
  }

  accionActualizar()
  {
   
    let producto = this.productoForm.value;
    producto.idProducto = this.idActualizar;
    const imageHtml = document.getElementById("imagenFile") as HTMLInputElement;
    const imagenFile = imageHtml.files?.[0];
    if(imagenFile){
      if(this.productoForm.invalid)
      {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        producto.imagen = base64String.split(',')[1]; 
        this.productoService.actualizarProducto(producto).subscribe({
          next: data => {
            this.actualizarTabla();
            this.mostrarNotificacionExito();
            this.dialog.closeAll();
          },
          error:(error: HttpErrorResponse) =>{
            this.baseResponse = error.error;
            this.mostrarNotificacionError();
          }
        });
      };
      
      reader.readAsDataURL(imagenFile);
    }
    else{
      this.productoForm.get('imagen')?.setErrors(null);
      if(this.productoForm.invalid){
        return;
      };
      producto.imagen = null;
      this.productoService.actualizarProducto(producto).subscribe({
        next: data => {
          console.log(data);
          this.actualizarTabla();
          this.mostrarNotificacionExito();
          this.dialog.closeAll();
        },
        error:(error: HttpErrorResponse) =>{
          this.baseResponse = error.error;
          this.mostrarNotificacionError();
        }
      });
    }
  }

  onClickAbrirModal(){
   
    this.dialog.open(this.modalMantenimiento, {width: '500px', height: '800px'});
    this.limpiarFormulario();
    this.tituloBoton = BOTON_REGISTRAR + ' PRODUCTO';
    this.tipoModal = 0;
  }
  
  registrarProducto(){
    if(this.productoForm.invalid){
      this.submited = false;
      return;
    }
    this.submited = true;
    let producto = this.productoForm.value;
    const imageHtml = document.getElementById("imagenFile") as HTMLInputElement;
    const imagenFile = imageHtml.files?.[0];
    let extension = imagenFile?.name.split('.').pop()?.toLowerCase() || '';
    let extensionPermitida = EXTENSIONES_PERMITIDAS_IMG.includes(extension);
    if(imagenFile && extensionPermitida){
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        producto.imagen = base64String.split(',')[1]; 
        this.productoService.registrarProducto(producto).subscribe({
          next: data => {
            this.baseResponse = data;
            console.log(data);
            this.mostrarNotificacionExito();
            this.dialog.closeAll();
            this.dataProducto.data.push(data);
            this.dataProducto._updateChangeSubscription();
            this.limpiarFormulario();
            this.actualizarTabla();
          },
          error:(error: HttpErrorResponse) =>{
            this.baseResponse = error.error;
            this.mostrarNotificacionError();
          }
        });
      };
      
      reader.readAsDataURL(imagenFile);
    }else{
      let response : BaseResponse = {
        codRespuesta : "1",
        descripcion : "Ingrese una imagen correcta.",
        msjRespuesta : "Error"
      }
      this.baseResponse = response;
      this.mostrarNotificacionError()
    }
 
  }


  limpiarFormulario()
  {
    this.productoForm.reset();
  }

  mostrarNotificacionExito()
  {
    this.tituloNotificacion = TITULO_EXITO_NOTIFICACION;
    this.snackBar.openFromTemplate(this.notificacion, {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  mostrarNotificacionError()
  {
    this.tituloNotificacion = TITULO_ERROR_NOTIFICACION;
    this.snackBar.openFromTemplate(this.notificacion, {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  

}
