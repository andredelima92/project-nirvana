using System.Collections.Generic;
using System.Linq;
using server.Models;

namespace server.Data
{
    public class SqlTravelRepo : ITravelRepo
    {
        private readonly TravelContext _context;

        public SqlTravelRepo(TravelContext context)
        {
            _context = context;
        }
        public IEnumerable<Travel> get()
        {
            return _context.Travels.ToList();
        }

        public Travel show(int id)
        {
            return _context.Travels.FirstOrDefault(p => p.Id == id);
        }
    }
}