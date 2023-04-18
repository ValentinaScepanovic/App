using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DataBase.Entities
{
    public class Book
    {
        public int BookId { get; set; }

        public string BookName { get; set; }

        public string Author { get; set; }

        public string Genre { get; set; }

        public string? Picture {get; set;}

    }
}