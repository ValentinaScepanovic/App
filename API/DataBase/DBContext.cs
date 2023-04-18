using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DataBase
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options):base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }  
        public DbSet<Book> Books {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
      {
         base.OnModelCreating(builder);
         
          builder.Entity<User>()
              .HasIndex(u => u.Id)
              .IsUnique();

          builder.Entity<Book>()
              .HasIndex(b => b.BookId)
              .IsUnique();
      }
    }
    
}