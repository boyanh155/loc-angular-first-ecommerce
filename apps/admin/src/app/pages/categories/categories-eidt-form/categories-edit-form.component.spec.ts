import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditFormComponent } from './categories-edit-form.component';

describe('CategoryEditFormComponent', () => {
  let component: CategoryEditFormComponent;
  let fixture: ComponentFixture<CategoryEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryEditFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
