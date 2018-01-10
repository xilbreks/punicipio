import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateEditComponent } from './debate-edit.component';

describe('DebateEditComponent', () => {
  let component: DebateEditComponent;
  let fixture: ComponentFixture<DebateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
