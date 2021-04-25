using System.Collections.Generic;
using server.Models;

namespace server.Data
{
    public interface ITravelRepo
    {
        bool SaveChanges();
        IEnumerable<Travel> get();
        Travel show(int id);
        void store(Travel travel);
    }
}