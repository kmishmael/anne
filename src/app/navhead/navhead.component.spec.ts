import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavheadComponent } from './navhead.component';

describe('NavheadComponent', () => {
  let component: NavheadComponent;
  let fixture: ComponentFixture<NavheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
