import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasParaHoyComponent } from './citas-para-hoy.component';

describe('CitasParaHoyComponent', () => {
  let component: CitasParaHoyComponent;
  let fixture: ComponentFixture<CitasParaHoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasParaHoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasParaHoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
