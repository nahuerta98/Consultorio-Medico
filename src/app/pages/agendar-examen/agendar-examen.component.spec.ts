import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarExamenComponent } from './agendar-examen.component';

describe('AgendarExamenComponent', () => {
  let component: AgendarExamenComponent;
  let fixture: ComponentFixture<AgendarExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendarExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
