using System.Collections.Generic;
using server.Models;


namespace server.Services
{
    public class TravelService
    {
        List<Travel> _travelList = null;
        public TravelService()
        {
            _travelList = new List<Travel>();
        }

        public List<Travel> GetTravels()
        {
            return _travelList;
        }

        public void AddTravel(Travel travel)
        {
            _travelList.Add(travel);
        }
    }
}