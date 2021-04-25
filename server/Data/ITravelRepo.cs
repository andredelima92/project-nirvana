using System.Collections.Generic;
using server.Models;

namespace server.Data
{
    public interface ITravelRepo
    {
        IEnumerable<Travel> GetAppTravels();
        Travel GetTravelById(int id);
    }
}