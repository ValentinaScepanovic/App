
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = '/api/book/';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    const url = `${this.apiUrl}allBooks`;
    return this.http.get<Book[]>(url)
  }

  addNewBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}addNewBook`;
    return this.http.post<Book>(url, book);
  }

  editBook(bookId: number, book: Book): Observable<number> {
    const url = `${this.apiUrl}editBook/${bookId}`;
    return this.http.put<number>(url, book);
  }

  getBookById(bookId: number) : Observable<Book>{
    const url = `${this.apiUrl}getBook/${bookId}`;
    return this.http.get<Book>(url);
  }

  deleteBook(bookId: number): Observable<number> {
    const url = `${this.apiUrl}deleteBook/${bookId}`;
    return this.http.delete<number>(url);
  }

}