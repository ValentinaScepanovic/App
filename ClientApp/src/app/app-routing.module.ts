import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BooksComponent } from './components/books/books.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'books', component: BooksComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' }
    
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
