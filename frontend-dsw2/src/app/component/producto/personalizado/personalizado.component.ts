import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/modal/base-response';
import { ColorCuadro } from 'src/app/modal/color-cuadro';
import { CuadroPersonalizado } from 'src/app/modal/cuadro-personalizado';
import { MaterialCuadro } from 'src/app/modal/material-cuadro';
import { Usuario } from 'src/app/modal/usuario';
import { ColorproductoService } from 'src/app/service/colorproducto/colorproducto.service';
import { MaterialproductoService } from 'src/app/service/materialproducto/materialproducto.service';
import { PersonalizadoService } from 'src/app/service/producto/personalizado/personalizado.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { BOTON_ACTUALIZAR, EXTENSIONES_PERMITIDAS_IMG, PATTERN_ALFABETICO_ESPACIO, TITULO_ERROR_NOTIFICACION, TITULO_EXITO_NOTIFICACION } from 'src/app/util/constantes';

@Component({
  selector: 'app-personalizado',
  templateUrl: './personalizado.component.html',
  styleUrls: ['./personalizado.component.css']
})
export class PersonalizadoComponent implements OnInit, AfterViewInit {
  @ViewChild('notificacion') notificacion!: TemplateRef<any>
  @ViewChild("modalMantenimiento") modalMantenimiento! : TemplateRef<any>

  public usuario!: Usuario;
  public cuadroPersonalizado!: CuadroPersonalizado[];
  public colorCuadro!: ColorCuadro[];
  public materialCuadro!: MaterialCuadro[];

  cuadroPersonalizadoForm!: FormGroup;

  submited: Boolean = true;

  dataCuadroPersonalizado: MatTableDataSource<CuadroPersonalizado>;

  baseResponse?: BaseResponse;
  tituloNotificacion?: string;
  idCPActualizar?: number;
  indActualizar : Boolean = false;
  tituloBoton? : string;
  tipoModal? : number; // 0 REGISTRAR, 1 ACTUALIZAR

  constructor(private personalizadoService: PersonalizadoService, 
    private colorProductoService: ColorproductoService,
    private materialProductoService: MaterialproductoService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog, private snackBar: MatSnackBar) {
      this.cuadroPersonalizadoForm = this.formBuilder.group(
        {
          nombre: ['', Validators.required, Validators.pattern(PATTERN_ALFABETICO_ESPACIO)],
          materialId: ['', Validators.required],
          colorId: ['', Validators.required],
          medidaHorizontal: ['', Validators.required],
          medidaVertical: ['', Validators.required],
          imagen: [null, Validators.required],
          usuarioId: ['', Validators.required]
        }
      );

      this.dataCuadroPersonalizado = new MatTableDataSource<CuadroPersonalizado>([]);
      this.usuarioService.buscarPorEmail(localStorage.getItem("email")!).subscribe(data => this.usuario = data);
    }

  ngOnInit(): void {
    this.colorProductoService.obtenerColores().subscribe(data => this.colorCuadro = data);
    this.materialProductoService.obtenerMateriales().subscribe(data => this.materialCuadro = data);
    console.log(this.colorCuadro);
    console.log(this.materialCuadro);
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  registrarCuadroPersonalizado() {
    if(this.cuadroPersonalizadoForm.invalid) {
      this.submited = false;
      return;
    }
    this.submited = true;
    let cuadroPersonalizado = this.cuadroPersonalizadoForm.value;
    const imagenHtml = document.getElementById("imgFile") as HTMLInputElement;
    const imagenFile = imagenHtml.files?.[0];
    let extension = imagenFile?.name.split('.').pop()?.toLowerCase() || '';
    let extensionPermitida = EXTENSIONES_PERMITIDAS_IMG.includes(extension);
    
    if(imagenFile && extensionPermitida){
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        cuadroPersonalizado.imagen = base64String.split(',')[1];
        cuadroPersonalizado.usuarioId = this.usuario.id;
        console.log("primero ")
        console.log(cuadroPersonalizado);
        this.personalizadoService.registrarCuadroPersonalizado(cuadroPersonalizado).subscribe({
          next: data => {
            console.log(data);
            this.mostrarNotificacionExito();
            this.dialog.closeAll();
            this.dataCuadroPersonalizado.data.push(data);
            this.dataCuadroPersonalizado._updateChangeSubscription();
            this.limpiarFormulario();
          },
          error: (error : HttpErrorResponse) => {
            this.baseResponse = error.error;
            this.mostrarNotificacionError();
          }
        });
      };

      reader.readAsDataURL(imagenFile);
    } else {
      let response : BaseResponse = {
        codRespuesta : "1",
        descripcion : "Ingrese una imagen correcta.",
        msjRespuesta : "Error"
      }
      this.baseResponse = response;
      this.mostrarNotificacionError()
    }
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
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  limpiarFormulario() {
    this.cuadroPersonalizadoForm.reset();
  }
}
