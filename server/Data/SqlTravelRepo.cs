using System;
using System.Collections.Generic;
using System.Linq;
using server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

namespace server.Data
{
    public class SqlTravelRepo : ITravelRepo
    {
        private readonly TravelContext _context;

        public SqlTravelRepo(TravelContext context)
        {
            _context = context;
        }
        public IEnumerable<Travel> get(int _limit,int _offset, string _orderBy, string _search)
        {
            var travels =  _context.Travels.FromSqlRaw($"SELECT * FROM travels WHERE reference LIKE '%{_search}%' OR name LIKE '%{_search}%' OR description LIKE '%{_search}%' OR city LIKE '%{_search}%' ORDER BY {_orderBy} DESC OFFSET {_offset} ROWS FETCH NEXT {_limit} ROWS ONLY ").ToList();
            
            return travels;
        }

        public Travel show(int id)
        {
            return _context.Travels.FirstOrDefault(p => p.Id == id);
        }

        public void store(Travel travel)
        {
            if(travel == null)
            {
                throw new ArgumentNullException(nameof(travel));
            }

            _context.Travels.Add(travel);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void update(Travel travel)
        {
            //
        }

        public void destroy(Travel travel)
        {
            if(travel == null)
            {
                throw new ArgumentNullException(nameof(travel));
            }

            _context.Travels.Remove(travel);
        }
    }
}