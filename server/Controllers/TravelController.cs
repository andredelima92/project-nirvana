using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelController: ControllerBase
    {
        TravelService _travelService;
        public TravelController(TravelService travel)
        {
            this._travelService = travel;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(this._travelService.GetTravels());
        }

        [HttpPost]
        public ActionResult Post(Travel travel)
        {
            this._travelService.AddTravel(travel);
            return Ok();
        }
    }
}