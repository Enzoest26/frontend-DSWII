import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificaCuadroComponent } from './verifica-cuadro.component';

describe('VerificaCuadroComponent', () => {
  let component: VerificaCuadroComponent;
  let fixture: ComponentFixture<VerificaCuadroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificaCuadroComponent]
    });
    fixture = TestBed.createComponent(VerificaCuadroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
