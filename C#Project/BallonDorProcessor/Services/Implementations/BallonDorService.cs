using BallonDorEntities.Models;
using BallonDorProcessor.Services.Interfaces;
using DataAccess.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BallonDorProcessor.Services.Implementations
{
    public class BallonDorService : IBallonDorService
    {
        private readonly IBallonDorRepository _ballonDorRepository;

        public BallonDorService(IBallonDorRepository ballonDorRepository)
        {
            _ballonDorRepository = ballonDorRepository;
        }

        public List<PlayerDTO> getBallonDorWinners()
        {
            List<BallonDor> ballonDors = _ballonDorRepository.getBallonDors();
            HashSet<string> winnersSet = new HashSet<string>(ballonDors.Select(r => r.winnerFullName));
            List<PlayerDTO> winners = new List<PlayerDTO>();


            //process data to DTO
            foreach (var winnerFullName in winnersSet)
            {
                BallonDor currentPlayer = ballonDors.First(p => p.winnerFullName == winnerFullName);
                PlayerDTO playerToAdd = new PlayerDTO()

                {
                    firstName = currentPlayer.winnerFirstName,
                    lastName = currentPlayer.winnerLastName,
                    position = currentPlayer.winnerPosition,
                    years = ballonDors.Where(p => p.winnerFullName == winnerFullName).Select(p => p.year).ToList(),
                    total = ballonDors.Count(p => p.winnerFullName == winnerFullName)
                };
                winners.Add(playerToAdd);
            }

            return winners;
        }
    }
}
