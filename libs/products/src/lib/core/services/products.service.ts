import { Observable } from 'rxjs';
import { Product, ProductResponse } from './../model/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrlProduct = `${environment.apiURL}/products`;
  private apiUrlProductId = (id: string | null = "") => `${environment.apiURL}/products/${id}`


  constructor(private http: HttpClient) {
  }

  //[GET]  /products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrlProduct)
  }
  //[POST]  /products
  createProduct(data: Product): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.apiUrlProduct, data)
  }
  //[POST]  /products/:id
  updateProduct(data: Product, id: string): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.apiUrlProductId(id), data)
  }
  //[GET]  /products/:id
  getProductById(id: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrlProductId(id))
  }
}
