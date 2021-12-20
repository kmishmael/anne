import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteditComponent } from './postedit.component';

describe('PosteditComponent', () => {
  let component: PosteditComponent;
  let fixture: ComponentFixture<PosteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosteditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
