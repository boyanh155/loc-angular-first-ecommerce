import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category, CategoriesService } from '@loc-angular/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from "rxjs"
@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html',
  styles: [],
})
export class CategoryFormComponent implements OnInit {
  isSubmit = false
  nameControl: FormControl = new FormControl("", {
    validators: Validators.required
  });
  iconControl: FormControl = new FormControl("", {
    validators: Validators.required
  });
  colorControl: FormControl = new FormControl("#495057", {
    validators: Validators.required
  });
  categoryForm: FormGroup = new FormGroup({});

  constructor(private router: Router, private formBuilder: FormBuilder, private categoryService: CategoriesService, private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      iconControl: this.iconControl,
      nameControl: this.nameControl,
      colorControl: this.colorControl,
    })



  }
  onCreateButtonSubmit(): void {
    this.isSubmit = true
    if (this.categoryForm.invalid) return;
    const newCategory: Category = {
      icon: this.iconControl.value,
      name: this.nameControl.value,
      color: this.colorControl.value,
    }
    this.categoryService.postCategory(newCategory).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ key: 'stateToast', severity: 'success', summary: "Successfully", detail: res.message || "Created Successfully" });
          timer(1000).subscribe({
            next: (done) => this.router.navigate(['/categories']),
            error: () => this.messageService.add({ key: 'stateToast', severity: 'warn', summary: "Go back", detail: "Finished transaction, back to previous page" })
          })
        }
        else this.messageService.add({ key: 'stateToast', severity: 'error', summary: "Error", detail: res.message || "Try again" });
      },
      error: (err) => {
        this.messageService.add({ key: 'stateToast', severity: 'error', summary: err.name || "Error", detail: err.message || "Try again" })
      },
      complete: () => console.log("success fetch")
    })
  }

  // function
  get name() {
    return this.nameControl
  }
  get icon() {
    return this.iconControl
  }


}
