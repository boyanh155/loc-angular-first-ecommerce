import { MessageService } from 'primeng/api';
import { Product, ProductsService } from '@loc-angular/products';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {

  products: Array<Product> = [];
  constructor(private productService: ProductsService, private messageService: MessageService, private detect: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getProductList()
  }
  getProductList(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        console.log(res)
        if (res.length > 0) this.products = res
        else throw new Error("Zero product found")
        this.detect.detectChanges();
      },
      error: (err) => {
        this.products = [{
          id: 0o0,
          name: "Loi he thong",
          image: "Loi he thong",
          price: 0o0,
          countInStock: 0o0,
          dateCreated: "",

        }]
        this.messageService.add({ key: 'stateToast', severity: 'error', summary: err.name || "Error", detail: err.message || "Try again" })
      },
      complete: () => console.log('success fetch product')

    })
  }
  deleteConfirm(): void { }
}
