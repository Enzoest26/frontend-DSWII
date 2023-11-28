import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorListTemplateComponent } from '../component/error-list-template/error-list-template.component';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private snackBar : MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap({
      next: (event) =>{

      },
      error: (error) => {
        if(error.status === 400){
          const errores = error.error.errores;
          this.snackBar.openFromComponent(ErrorListTemplateComponent, {
            data: errores,
            duration: 1000 * 6,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'] 
          });
        }else if(error.status === 500){
          this.snackBar.open("Ocurrio error interno con el servidor.", "", {
            duration: 1000 * 6,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }else if(error.status === 0){
          this.snackBar.open("No hubo comunicación con el servidor. Contacte con su administrador.", "", {
            duration: 1000 * 6,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      }
    }));
  }
}
