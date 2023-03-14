import { CategoriesService, Category } from '@loc-angular/products';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'admin-dropdown-categories',
  template: ` <p-dropdown [ngClass]="class" [options]="categories" [(ngModel)]="selectedCategory" (onChange)="onChangeHandler()" optionLabel="name" optionValue="id"></p-dropdown> `,
  styleUrls: ['./dropdown-categories.component.scss'],
})
export class DropdownCategoriesComponent implements OnInit {
  @Output() eventCategoryChange: EventEmitter<Category> = new EventEmitter<Category>();
  @Input() class: string


  categories: Category[] = []

  selectedCategory: Category

  constructor(private categoriesService: CategoriesService) { }
  ngOnInit(): void {
    console.log(this.class)
    this._getCategories()
  }

  private _getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error(err) {
        // Add get categories error message
      },
      complete() {

      },
    })
  }
  // Event handle
  onChangeHandler(): void {
    const currentCategory: Category |undefined =
      this.categories
        .find((v:Category)=>v.id == this.selectedCategory
        )

   
    this.eventCategoryChange.emit(currentCategory)
  }
}
