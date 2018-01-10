import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidenteComponent } from './presidente.component';

describe('PresidenteComponent', () => {
  let component: PresidenteComponent;
  let fixture: ComponentFixture<PresidenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresidenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
