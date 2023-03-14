import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Category } from '@loc-angular/products';
import { CategoriesService } from '@loc-angular/products';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'admin-categories-edit-form',
  templateUrl: './categories-edit-form.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryEditFormComponent implements OnInit {

  paramId: string | null;
  currentCategory: Category;
  categoryForm: FormGroup;
  nameControl: FormControl = new FormControl("", {
    validators: Validators.required
  })
  colorValue?: string

  iconControl: FormControl = new FormControl("", {
    validators: Validators.required
  });
  colorControl: FormControl = new FormControl("#fff", {
    validators: Validators.required

  })
  isSubmitted = false;
  constructor(
    private categoriesService: CategoriesService,
    private route: Router,
    private messagesService: MessageService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {

    this.categoryForm = this.formBuilder.group({
      iconControl: this.iconControl,
      nameControl: this.nameControl,
      colorControl: this.colorControl
    })
    this.paramId = this.activeRoute.snapshot.paramMap.get('id');
    this.getCategory(this.paramId)

  }
  updateButtonClickHandler(): void {
    this.isSubmitted = true
    if (this.categoryForm.invalid || (this.currentCategory.icon === this.iconControl.value && this.currentCategory.name === this.nameControl.value && this.colorControl.value === this.currentCategory.color)) return;
    const updatedCategory: Category = {
      ...this.currentCategory,
      name: this.nameControl.value,
      icon: this.iconControl.value,
      color: this.colorControl.value || this.colorValue
    }

    this.categoriesService.updateCategory(this.paramId, updatedCategory).subscribe({
      next: (res) => {
        if (res.success) {
          this.messagesService.add({ key: 'stateToast', severity: 'success', summary: "Successfully", detail: res.message || "Created Successfully" });
          timer(1000).subscribe({
            next: (done) => this.route.navigate(['/categories']),
            error: () => this.messagesService.add({ key: 'stateToast', severity: 'warn', summary: "Go back", detail: "Finished transaction, back to previous page" })
          })
        }
        else this.messagesService.add({ key: 'stateToast', severity: 'error', summary: "Error", detail: res.message || "Try again" });
      },
      error: (err) => {
        this.messagesService.add({ key: 'stateToast', severity: 'error', summary: err.name || "Error", detail: err.message || "Try again" })
      },
      complete: () => console.log("success fetch")
    })


    // this.categoriesService.updateCategory()
  }
  getCategory(id: string | null): void {
    this.categoriesService.getCategory(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.iconControl.setValue(`${res.category.icon}`)
          this.nameControl.setValue(`${res.category.name}`)
          this.colorControl.setValue(`${res.category.color}`)
          this.colorValue = res.category.color
          this.currentCategory = res.category
        } else {
          throw new Error(res.message)
        }
      },
      error: (err) => {
        this.messagesService.add({
          severity: 'error',
          key: 'toastState',
          summary: 'System fail',
          detail: err.message || 'Cant GET this time',
        })
        timer(2000).subscribe({
          next: () => this.route.navigate(['/categories'])
        })
      }
    })
  }

}
