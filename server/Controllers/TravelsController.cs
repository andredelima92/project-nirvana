using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;
using System.Collections.Generic;
using server.Data;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelsController: ControllerBase
    {
        private readonly MockTravelRepo _repository = new MockTravelRepo();

        [HttpGet]
        public ActionResult <IEnumerable<Travel>> GetAllTravels()
        {
            var travels = _repository.GetAppTravels();

            return Ok(travels);
        }

        [HttpGet("{id}")]
        public ActionResult <Travel> GetTravelById(int id)
        {
            var travels = _repository.GetTravelById(id);

            return Ok(travels);
        }
    }
}