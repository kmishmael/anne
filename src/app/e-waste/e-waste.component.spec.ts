import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EWasteComponent } from './e-waste.component';

describe('EWasteComponent', () => {
  let component: EWasteComponent;
  let fixture: ComponentFixture<EWasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EWasteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EWasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
