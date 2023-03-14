import { environment } from '@env/environment';
import { Category, CategoryResponse } from "../model/Category"
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  private apiUrlCategory = `${environment.apiURL}/categories`;
  private apiUrlCategoryId = (id: string | null) => `${environment.apiURL}/categories/${id}`

  constructor(private http: HttpClient) { }
  // [GET] /categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrlCategory)
  }
  // [POST] /categories
  postCategory(data: Category): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.apiUrlCategory, data)
  }
  // [UPDATE,DELETE] /categories/categoryId
  updateCategory(id: string | null, data: Category): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(this.apiUrlCategoryId(id), data)
  }
  deleteCategory(id: string | null): Observable<CategoryResponse> {
    return this.http.delete<CategoryResponse>(this.apiUrlCategoryId(id))
  }
  // [GET] /categories
  getCategory(id: string | null): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.apiUrlCategoryId(id))
  }


}
