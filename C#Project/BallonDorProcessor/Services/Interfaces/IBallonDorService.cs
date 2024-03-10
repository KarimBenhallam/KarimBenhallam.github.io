using BallonDorEntities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BallonDorProcessor.Services.Interfaces
{
    public interface IBallonDorService
    {
        List<PlayerDTO> getBallonDorWinners();
    }
}
