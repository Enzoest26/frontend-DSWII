import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/modal/usuario';
import { RegistroService } from 'src/app/service/registro/registro.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PATTERN_ALFABETICO_ESPACIO, PATTERN_NUMERICO, TITULO_ERROR_NOTIFICACION, TITULO_EXITO_NOTIFICACION } from 'src/app/util/constantes';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/modal/base-response';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, AfterViewInit {
  @ViewChild('notificacion') notificacion!: TemplateRef<any>

  public usuarios!: Usuario[];

  usuarioForm !: FormGroup;

  submited : Boolean = true;

  dataUsuario: MatTableDataSource<Usuario>;

  baseResponse ?: BaseResponse;

  tituloNotificacion ?: string;


  constructor(private registroService: RegistroService, private formBuilder : FormBuilder,
    private dialog : MatDialog, private snackBar : MatSnackBar){
      this.usuarioForm = this.formBuilder.group(
        {
          direccion: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
          password: ['', Validators.required],
          telefono: ['', [Validators.required, Validators.maxLength(9),Validators.pattern(PATTERN_NUMERICO)]],
          username: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]]
        }
      );

      this.dataUsuario = new MatTableDataSource<Usuario>([]);
    }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  registrarUsuario(){
    if(this.usuarioForm.invalid)
    {
      this.submited = false;
      return;
    }
    this.submited = true;
    let usuario = this.usuarioForm.value;
    usuario.tipoUsuario = 'USER';

    this.registroService.registrarUsuario(usuario).subscribe({
      next: data => {
        console.log(data);
        this.mostrarNotificacionExito();
        this.dialog.closeAll();
        this.dataUsuario.data.push(data);
        this.dataUsuario._updateChangeSubscription();
        this.limpiarFormulario();
      },
      error: (error : HttpErrorResponse) =>{
        this.baseResponse = error.error;
        this.mostrarNotificacionError();
      }
    });
  }

  mostrarNotificacionError() {
    this.tituloNotificacion = TITULO_ERROR_NOTIFICACION;
    this.snackBar.openFromTemplate(this.notificacion, {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  mostrarNotificacionExito() {
    this.tituloNotificacion = TITULO_EXITO_NOTIFICACION;
    this.snackBar.openFromTemplate(this.notificacion, {
      duration: 10 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }


  limpiarFormulario() {
    this.usuarioForm.reset();
  }

}
