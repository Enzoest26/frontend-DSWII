import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { BaseResponse } from 'src/app/modal/base-response';
import { Usuario } from 'src/app/modal/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { BOTON_ACTUALIZAR, BOTON_REGISTRAR, TITULO_ERROR_NOTIFICACION, TITULO_EXITO_NOTIFICACION } from 'src/app/util/constantes';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  @ViewChild("modalMantenimiento") modalMantenimiento! : TemplateRef<any>
  @ViewChild("modalEliminar") modalEliminar! : TemplateRef<any>
  @ViewChild("toast") toast! : NgbToast
  @ViewChild('dialogEliminar') dialogEliminar!: TemplateRef<any>
  @ViewChild('notificacion') notificacion!: TemplateRef<any>
  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>

  usuariosData! : Usuario[];

  usuarioForm! : FormGroup;

  indActualizar : Boolean = false;
  idEliminar?: number;
  idActualizar?: number;
  mostrarToast: boolean = false;
  baseResponse? : BaseResponse;
  tituloNotificacion ?: string;
  tituloBoton? : string;

  tipoModal? : number; // 0 REGISTRAR, 1 ACTUALIZAR

  submited : Boolean = true;
  dataUsuario: MatTableDataSource<Usuario>;

  constructor(private usuarioService : UsuarioService,private modalService: NgbModal, private formBuilder : FormBuilder, private dialog : MatDialog
    ,private snackBar : MatSnackBar ){
    this.usuarioForm = formBuilder.group({
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      password: ['', Validators.required],
      telefono: ['', Validators.required],
      tipoUsuario: ['', Validators.required]
    });

    this.dataUsuario = new MatTableDataSource<Usuario>([]);
  }
  ngOnInit(): void {
    this.usuarioService.obtenerUsuario().subscribe(data => this.usuariosData = data);
  }

  abrirMantenimientoActualizar(id: number)
  {
    this.usuarioForm.reset();
    this.usuarioService.buscarPorId(id).subscribe({
      next: data =>{
        this.usuarioForm.patchValue({
          direccion : data.direccion,
          email : data.email,
          nombre : data.nombre,
          telefono : data.telefono,
          tipoUsuario : data.tipoUsuario
        });
        this.idActualizar = id;
      }
    });
    this.indActualizar = true;
    this.dialog.open(this.modalMantenimiento, {width: '500px', height: '800px'});
    this.tituloBoton = BOTON_ACTUALIZAR + ' USUARIO';
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
    this.usuarioService.eliminarUsuario(this.idEliminar!).subscribe({next: data =>{
      this.actualizarTabla();
      
    }, error: error =>{
      this.baseResponse = error.error;
      this.mostrarToast = true;
      this.mostrarNotificacionError()
    }})
  }

  actualizarTabla()
  {
    this.usuariosData = [];
    this.usuarioService.obtenerUsuario().subscribe(data => this.usuariosData = data);
  }

  accionActualizar()
  {
    if(this.usuarioForm.invalid)
    {
      return;
    }
    let usuario = this.usuarioForm.value;
    usuario.id = this.idActualizar;
    this.usuarioService.actualizarUsuario(usuario).subscribe({next: data =>{
      this.actualizarTabla();
      this.mostrarNotificacionExito();
      this.dialog.closeAll();
    }})
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

  onClickAbrirModal(){
    this.dialog.open(this.modalMantenimiento, {width: '500px', height: '800px'});
    this.limpiarFormulario();
    this.tituloBoton = BOTON_REGISTRAR + ' USUARIO';
    this.tipoModal = 0;
  }

  registrarUsuario(){
    if(this.usuarioForm.invalid){
      this.submited = false;
      return;
    }
    this.submited = true;
    let user = this.usuarioForm.value;
    this.usuarioService.registrarUser(user).subscribe({
      next: data => {
        console.log(data);
        this.mostrarNotificacionExito();
        this.dialog.closeAll();
        this.dataUsuario.data.push(data);
        this.dataUsuario._updateChangeSubscription();
        this.limpiarFormulario();
        this.actualizarTabla();
      },
      error:(error: HttpErrorResponse) =>{
        this.baseResponse = error.error;
        this.mostrarNotificacionError();
      }
    })
  }

  limpiarFormulario()
  {
    this.usuarioForm.reset();
  }

}
