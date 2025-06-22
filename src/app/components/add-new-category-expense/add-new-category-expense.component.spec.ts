import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCategoryExpenseComponent } from './add-new-category-expense.component';

describe('AddNewCategoryExpenseComponent', () => {
  let component: AddNewCategoryExpenseComponent;
  let fixture: ComponentFixture<AddNewCategoryExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCategoryExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCategoryExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
