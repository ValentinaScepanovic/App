import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/books.model';
import { BookService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{

  formVisible=false;
  formEditVisible=false;
  formDeleteVisible=false;
  loading: boolean = true;

  imageUrl: string;
  file:File;

  books: Book [] =[];

  newBook: Book ={
    bookId:null,
    bookName:'',
    author:'',
    genre:'',
    picture:''
  };

  editBook: Book = { 
    bookId: null, 
    bookName: '', 
    author: '', 
    genre: '', 
    picture: '' 
  };

  deleteBook: Book = { 
    bookId: null, 
    bookName: '', 
    author: '', 
    genre: '', 
    picture: '' 
  };


  constructor(private _bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this._bookService.getAllBooks().subscribe(
      (books) => {
        this.books = books.map(book => ({
          ...book,
          picture: book.picture
        }));
        this.loading = false;
      }
    );
  }

  form() {
    this.formVisible = !this.formVisible;
  }
  closeEdit(){
    this.formEditVisible = !this.formEditVisible;
  }
  closeDelete(){
    this.formDeleteVisible = !this.formDeleteVisible;
  }

  formEdit(bookId : number) {
    this.formEditVisible = !this.formEditVisible;
    this._bookService.getBookById(bookId).subscribe((book) => {
      this.editBook=book;
      this.editBook.bookId=book.bookId;
      this.editBook.bookName=book.bookName;
      this.editBook.author=book.author;
      this.editBook.genre=book.genre;
      this.editBook.picture=book.picture;
    });

  }
  formDelete(bookId : number){
    this.formDeleteVisible=!this.formDeleteVisible;
    this._bookService.getBookById(bookId).subscribe((book) => {
      this.deleteBook=book
    });
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
    this.newBook.picture = reader.result as string;
  };
  }

  onSubmit() {
    this.formVisible = !this.formVisible;
    this.loading=true;
    this._bookService.addNewBook(this.newBook).subscribe(response => {
      this.books.unshift(response);
     this.refresh();
     this.loading=false;
    });
  }

  editThisBook(bookId : number){
    this.formEditVisible = !this.formEditVisible;
    this.loading=true;
    if(bookId==this.editBook.bookId){
    this._bookService.editBook(bookId, this.editBook).subscribe(response => {
      const index = this.books.findIndex((b) => b.bookId === bookId);
      if (index !== -1) {
        this.books[index] = this.editBook;
      }
      this.refresh();
      this.loading = false;
    });
  }
  }
  
  deleteThisBook() {
    this.loading=true;
    this.formDeleteVisible=!this.formDeleteVisible;
    this._bookService.deleteBook(this.deleteBook.bookId)
      .subscribe(
        response=> {
            this.books.splice(this.deleteBook.bookId);
            this.refresh();
            this.loading=false;
          });
      }

    refresh() {
        this.ngOnInit()
     }
 }


