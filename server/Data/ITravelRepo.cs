using System.Collections.Generic;
using server.Models;

namespace server.Data
{
    public interface ITravelRepo
    {
        IEnumerable<Travel> get();
        Travel show(int id);
    }
}