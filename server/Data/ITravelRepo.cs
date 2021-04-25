using System.Collections.Generic;
using server.Models;

namespace server.Data
{
    public interface ITravelRepo
    {
        bool SaveChanges();
        IEnumerable<Travel> get(int _limit,int _offset, string _orderBy, string _search);
        Travel show(int id);
        void store(Travel travel);
        void update(Travel travel);
        void destroy(Travel travel);
    }
}