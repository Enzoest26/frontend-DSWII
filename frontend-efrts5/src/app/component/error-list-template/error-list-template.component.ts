import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-list-template',
  templateUrl: './error-list-template.component.html',
  styleUrls: ['./error-list-template.component.css']
})
export class ErrorListTemplateComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public errores: string []){
    
  }
}
