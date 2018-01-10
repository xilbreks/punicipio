import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretarioComponent } from './secretario.component';

describe('SecretarioComponent', () => {
  let component: SecretarioComponent;
  let fixture: ComponentFixture<SecretarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
