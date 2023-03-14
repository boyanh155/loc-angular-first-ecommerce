import { Product, Category } from '@loc-angular/products';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '@loc-angular/products';
@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',

})
export class ProductsFormComponent implements OnInit {
  // Initial area
  isEditMode = false
  paramId: string | null;
  isSubmitted = false
  // new file
  uploadedFile: any
  // Process area
  product: Product;
  // Form
  // Form - Group
  productForm: FormGroup;
  // Form - Control
  // require
  name: FormControl = new FormControl("", {

    validators: Validators.required
  });
  price: FormControl = new FormControl(0o0, {

    validators: Validators.required
  });
  brand: FormControl = new FormControl("", {

    validators: Validators.required
  });
  countInStock: FormControl = new FormControl(0o0, {

    validators: Validators.required
  });
  category: FormControl = new FormControl("", {

    validators: Validators.required
  })
  description: FormControl = new FormControl("", {

    validators: Validators.required
  });
  // none-require
  isFeatured: FormControl = new FormControl("");
  richDescription: FormControl = new FormControl("");
  image: FormControl = new FormControl("");



  constructor(
    private productService: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private messagesService: MessageService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this._init();

  }
  // ##Init
  // Init 
  private _init(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    // initial form group
    this.productForm = this.formBuilder.group({
      name: this.name,
      price: this.price,
      brand: this.brand,
      category: this.category,
      countInStock: this.countInStock,
      // des,rich,image,isFe
      description: this.description,
      richDescription: this.richDescription,
      image: this.image,
      isFeatured: this.isFeatured,

    })
    // In edit mode
    if (id) {
      this.isEditMode = true
      this._getProductById(id)
    }
    // Out edit mode
    else {
      this.isEditMode = false
    }
  }

  // ##Event Handler
  // Create product
  onCreateButtonSubmit(): void {
    console.log("create")
  }
  onUpload(event: any): void {
    this.uploadedFile = event.files[0]

    this.messagesService.add({ key: 'stateToast', severity: 'info', summary: 'File Uploaded', detail: '' });
  }
  onSelect(event: any): void {
    console.log(event.files[0])
    const url = event.files[0].objectURL.changingThisBreaksApplicationSecurity.toString();
    this.image.setValue(url)
  }
  // Update product
  onUpdateButtonSubmit(): void {
    console.log("update")

  }
  //Category change
  categoryChange(value: Category): void {
    console.log(value)
  }
  // ##Restful API
  _getProductById(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.product = res.product
        }
      }
    })
  }


}
