using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class TravelContext : DbContext
    {
        public TravelContext(DbContextOptions<TravelContext> opt): base(opt)
        {
            
        }

        public DbSet<Travel> Travels { get; set; }
    }
}