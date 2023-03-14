import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Component
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';
import { CategoryEditFormComponent } from './pages/categories/categories-eidt-form/categories-edit-form.component';

// MODULE
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ColorPickerModule } from 'primeng/colorpicker';
import { CategoriesService } from '@loc-angular/products';
import { ProductsService } from '@loc-angular/products';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PageNotFoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { DropdownCategoriesComponent } from './pages/categories/category-form/sub/dropdown-categories/dropdown-categories.component';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  ToastModule,
  InputTextModule,
  ColorPickerModule,
  ConfirmDialogModule,
  InputTextModule,
  DropdownModule,
  InputTextareaModule,
  ImageModule, FileUploadModule
];
const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/form',
        component: ProductsFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent,
      },
      {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
        path: 'categories/form',
        component: CategoryFormComponent,
      },
      {
        path: 'categories/:id',
        component: CategoryEditFormComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
      // {
      //   component: CategoriesListComponent,
      // },
      // {
      //   path: 'users',
      //   component: CategoriesListComponent,
      // },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoryFormComponent,
    PageNotFoundComponent,
    CategoryEditFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    DropdownCategoriesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InputNumberModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking' }),
    ...UX_MODULE,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    ProductsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
