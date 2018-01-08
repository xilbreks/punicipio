import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateEnCursoComponent } from './debate-en-curso.component';

describe('DebateEnCursoComponent', () => {
  let component: DebateEnCursoComponent;
  let fixture: ComponentFixture<DebateEnCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateEnCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateEnCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
