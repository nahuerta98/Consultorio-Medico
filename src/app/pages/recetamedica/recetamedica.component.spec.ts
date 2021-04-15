import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetamedicaComponent } from './recetamedica.component';

describe('RecetamedicaComponent', () => {
  let component: RecetamedicaComponent;
  let fixture: ComponentFixture<RecetamedicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetamedicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetamedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
