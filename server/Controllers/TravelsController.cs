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
        private readonly ITravelRepo _repository;

        public TravelsController(ITravelRepo repository)
        {
            _repository = repository;    
        }

        [HttpGet]
        public ActionResult <IEnumerable<Travel>> GetAllTravels()
        {
            var travels = _repository.get();

            return Ok(travels);
        }

        [HttpGet("{id}")]
        public ActionResult <Travel> GetTravelById(int id)
        {
            var travels = _repository.show(id);

            return Ok(travels);
        }
    }
}