import { MessageService, ConfirmationService } from 'primeng/api';
import { CategoriesService, Category } from '@loc-angular/products';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})

export class CategoriesListComponent implements OnInit {

  categories: Category[] = []
  isOpenDeleteDialog = false
  isConfirmDeleted = false
  constructor(private messageService: MessageService, private categoriesService: CategoriesService, private detect: ChangeDetectorRef, private confirmationService: ConfirmationService) {
  }
  ngOnInit(): void {
    this.getCategory()
  }

  // DELETE Confirm
  deleteConfirm(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Confirm your action?',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-trash',
      accept: () => {
        this.isConfirmDeleted = true;
        this.onDeleteButtonHandler(id);
      },
      reject: () => {
        this.isConfirmDeleted = false;
      }
    });
  }
  // DELETE Button click
  onDeleteButtonHandler(id: string): void {
    if (!this.isConfirmDeleted) return;
    this.categoriesService.deleteCategory(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.getCategory()

          this.messageService.add({ key: 'stateToast', severity: 'success', summary: "Successfully", detail: res.message || "Action successfully" });

        }
        else this.messageService.add({ key: 'stateToast', severity: 'error', summary: "Error", detail: res.message || "Try again" });
      },
      error: (err) => {
        this.messageService.add({ key: 'stateToast', severity: 'error', summary: err.name || "Error", detail: err.message || "Try again" })
      },
      complete: () => console.log("success deleted")
    })
  }
  getCategory(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories
        this.detect.detectChanges();

      },
      error: (err) => {
        this.categories = [{
          id: 0o0,
          name: "Loi he thong",
          icon: "Loi he thong",
        }]
        this.detect.detectChanges();

      },
      complete: () => console.log("success fetch")
    })
  }

}
