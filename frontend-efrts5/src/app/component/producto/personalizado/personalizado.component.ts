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
import { ColorproductoService } from 'src/app/service/colorproducto/colorproducto.service';
import { MaterialproductoService } from 'src/app/service/materialproducto/materialproducto.service';
import { PersonalizadoService } from 'src/app/service/producto/personalizado/personalizado.service';
import { PATTERN_ALFABETICO_ESPACIO, TITULO_ERROR_NOTIFICACION, TITULO_EXITO_NOTIFICACION } from 'src/app/util/constantes';

@Component({
  selector: 'app-personalizado',
  templateUrl: './personalizado.component.html',
  styleUrls: ['./personalizado.component.css']
})
export class PersonalizadoComponent implements OnInit, AfterViewInit {
  @ViewChild('notificacion') notificacion!: TemplateRef<any>

  public cuadroPersonalizado!: CuadroPersonalizado[];
  public colorCuadro!: ColorCuadro[];
  public materialCuadro!: MaterialCuadro[];

  cuadroPersonalizadoForm!: FormGroup;

  submited: Boolean = true;

  dataCuadroPersonalizado: MatTableDataSource<CuadroPersonalizado>;

  baseResponse?: BaseResponse;

  tituloNotificacion?: string;

  constructor(private personalizadoService: PersonalizadoService, 
    private colorProductoService: ColorproductoService,
    private materialProductoService: MaterialproductoService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog, private snackBar: MatSnackBar) {
      this.cuadroPersonalizadoForm = this.formBuilder.group(
        {
          nombre: ['', Validators.required, Validators.pattern(PATTERN_ALFABETICO_ESPACIO)],
          materialId: ['', Validators.required],
          colorId: ['', Validators.required],
          medidaHorizontal: ['', Validators.required],
          medidaVertical: ['', Validators.required],
          imagen: [''],
        }
      );

      this.dataCuadroPersonalizado = new MatTableDataSource<CuadroPersonalizado>([]);
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
    this.cuadroPersonalizadoForm.reset();
  }
}
