import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarComboComponent } from './registrar-combo.component';

describe('RegistrarComboComponent', () => {
  let component: RegistrarComboComponent;
  let fixture: ComponentFixture<RegistrarComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarComboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
