import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaMedicaPexistenteComponent } from './cita-medica-pexistente.component';

describe('CitaMedicaPexistenteComponent', () => {
  let component: CitaMedicaPexistenteComponent;
  let fixture: ComponentFixture<CitaMedicaPexistenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaMedicaPexistenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaMedicaPexistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
