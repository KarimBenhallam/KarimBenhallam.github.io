using BallonDorEntities.Models;
using BallonDorProcessor.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace BallonDor_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BallonDorController : Controller
    {
        private readonly IBallonDorService _ballonDorService;

        public BallonDorController(IBallonDorService ballonDorService)
        {
            _ballonDorService = ballonDorService;
        }

       [HttpGet]
       public List<PlayerDTO> GetBallonDors()
        {
            return _ballonDorService.getBallonDorWinners();
        }
    }
}
