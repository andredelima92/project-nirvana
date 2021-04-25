using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;
using System.Collections.Generic;
using server.Data;
using AutoMapper;
using server.Dtos;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelsController: ControllerBase
    {
        private readonly ITravelRepo _repository;
        private readonly IMapper _mapper;

        public TravelsController(ITravelRepo repository, IMapper mapper)
        {
            _repository = repository;    
            _mapper = mapper;    
        }

        [HttpGet]
        public ActionResult <IEnumerable<TravelReadDto>> GetAllTravels()
        {
            var travels = _repository.get();

            return Ok(_mapper.Map<IEnumerable<TravelReadDto>>(travels));
        }

        [HttpGet("{id}")]
        public ActionResult <TravelReadDto> GetTravelById(int id)
        {
            var travels = _repository.show(id);

            if (travels != null)
            {
                return Ok(_mapper.Map<TravelReadDto>(travels));
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult <TravelReadDto> CreateTravel(TravelCreateDto travelCreateDto)
        {
            var travelModel = _mapper.Map<Travel>(travelCreateDto);

            _repository.store(travelModel);
            _repository.SaveChanges();

            return Ok(travelModel);
        }
    }
}