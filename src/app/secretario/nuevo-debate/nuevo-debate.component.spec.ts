import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDebateComponent } from './nuevo-debate.component';

describe('NuevoDebateComponent', () => {
  let component: NuevoDebateComponent;
  let fixture: ComponentFixture<NuevoDebateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoDebateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
