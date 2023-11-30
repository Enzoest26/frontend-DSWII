import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorListTemplateComponent } from './error-list-template.component';

describe('ErrorListTemplateComponent', () => {
  let component: ErrorListTemplateComponent;
  let fixture: ComponentFixture<ErrorListTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorListTemplateComponent]
    });
    fixture = TestBed.createComponent(ErrorListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
