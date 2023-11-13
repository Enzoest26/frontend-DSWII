import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { BaseResponse } from 'src/app/modal/base-response';
import { Usuario } from 'src/app/modal/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { TITULO_ERROR_NOTIFICACION } from 'src/app/util/constantes';

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

  usuariosData! : Usuario[];

  usuarioForm! : FormGroup;

  indActualizar : Boolean = false;
  idEliminar?: number;
  mostrarToast: boolean = false;
  baseResponse? : BaseResponse;
  tituloNotificacion ?: string;

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
  }
  ngOnInit(): void {
    this.usuarioService.obtenerUsuario().subscribe(data => this.usuariosData = data);
  }

  abrirMantenimientoActualizar(id: number)
  {
    this.usuarioService.buscarPorId(id).subscribe({
      next: data =>{
        this.usuarioForm.patchValue({
          direccion : data.direccion,
          email : data.email,
          nombre : data.nombre,
          telefono : data.telefono,
          tipoUsuario : data.tipoUsuario
        })
      }
    });
    this.indActualizar = true;
    this.dialog.open(this.modalMantenimiento, {width: '500px', height: '800px'});
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
