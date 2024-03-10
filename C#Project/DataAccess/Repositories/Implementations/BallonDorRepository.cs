using BallonDorEntities.Models;
using DataAccess.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories.Implementations
{
    public class BallonDorRepository : IBallonDorRepository
    {
        public List<BallonDor> getBallonDors()
        {
            return JsonDb.GetAllItems();
        }
    }
}
