using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataBase;
using API.DataBase.Entities;
using API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Books
{
    public class BooksRepository : IBooksRepository
    {
        private readonly DBContext _context;

        public BooksRepository(DBContext context){
            _context=context;
        }

        public async Task<List<Book>> GetAllBooks (){
        
         var books=await _context.Books.OrderBy(b=>b.Author).ToListAsync();
         return books;
                
        }
        public async Task<Book> GetBookById(int id){
        return await _context.Books.SingleOrDefaultAsync(b => b.BookId == id);
    }
        public void AddBook(BookDto book)  {
            var newBook= new Book(){
                BookName=book.BookName,
                Author=book.Author,
                Genre=book.Genre,
                Picture=book.Picture
            };
            _context.Books.Add(newBook);
            _context.SaveChanges();
        }

        public void EditBook(int bookId, BookDto book){
            var editBook=_context.Books.Where(b=>b.BookId==bookId).First();
                editBook.BookName = book.BookName;
                editBook.Author=book.Author;
                editBook.Genre=book.Genre;
                editBook.Picture=book.Picture;
                _context.SaveChanges();
        }
        public void RemoveBook(Book book){
          _context.Remove(book);
          _context.SaveChanges();
        }
        
    }
}