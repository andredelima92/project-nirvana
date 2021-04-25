using System.Collections.Generic;
using server.Models;

namespace server.Data
{
    public class MockTravelRepo : ITravelRepo
    {
        public IEnumerable<Travel> get(int _limit,int _offset, string _orderBy, string _search)
        {
            var travels = new List<Travel>
            {
                new Travel{Id=0, Name="teste", City="cidade", Uf="SP", Description="descriçaõ", Reference="referencia"},
                new Travel{Id=1, Name="teste2", City="cidade", Uf="SP", Description="descriçaõ", Reference="referencia"},
                new Travel{Id=2, Name="teste3", City="cidade", Uf="SP", Description="descriçaõ", Reference="referencia"},
            };

            return travels;
        }

        public Travel show(int id)
        {
            return new Travel{Id=0, Name="teste", City="cidade", Uf="SP", Description="descriçaõ", Reference="referencia"};
        }

        public void store(Travel travel)
        {
            throw new System.NotImplementedException();
        }

        public bool SaveChanges()
        {
            throw new System.NotImplementedException();
        }

        public void update(Travel travel)
        {
            throw new System.NotImplementedException();
        }

        public void destroy(Travel travel)
        {
            throw new System.NotImplementedException();
        }

    }
}