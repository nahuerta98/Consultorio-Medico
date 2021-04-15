import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaExamenesComponent } from './agenda-examenes.component';

describe('AgendaExamenesComponent', () => {
  let component: AgendaExamenesComponent;
  let fixture: ComponentFixture<AgendaExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
