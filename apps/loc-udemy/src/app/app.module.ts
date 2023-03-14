import { UiModule } from '@loc-angular/ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
// routes
const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
];
// main
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule,BrowserAnimationsModule, RouterModule.forRoot(routes), UiModule,ButtonModule,AccordionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
