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
        public ActionResult <IEnumerable<TravelReadDto>> GetAllTravels(int _limit,int _offset, string _orderBy, string _search)
        {
            
            var travels = _repository.get(_limit,_offset, _orderBy, _search);

            return Ok(_mapper.Map<IEnumerable<TravelReadDto>>(travels));
            // return Ok(travels);
        }

        [HttpGet("{id}", Name="GetTravelById")]
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

            var travelReadDto = _mapper.Map<TravelReadDto>(travelModel);

            return CreatedAtRoute(nameof(GetTravelById), new {Id = travelReadDto.Id}, travelReadDto);
        }

        [HttpPut("{id}")]
        public ActionResult<TravelReadDto> UpdateTravel(int id, TravelUpdateDto travelUpdateDto)
        {
            var travel = _repository.show(id);
            
            if (travel == null) 
            {
                return NotFound();
            }
            
            _mapper.Map(travelUpdateDto, travel);
            _repository.update(travel);
            _repository.SaveChanges();

            var travelReadDto = _mapper.Map<TravelReadDto>(travel);

            return Ok(travelReadDto);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTravel(int id)
        {
            var travel = _repository.show(id);
            
            if (travel == null) 
            {
                return NotFound();
            }

            _repository.destroy(travel);
            _repository.SaveChanges();

            return NoContent();
        }
    }
}