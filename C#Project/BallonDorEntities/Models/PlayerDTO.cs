using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BallonDorEntities.Models
{
    public class PlayerDTO
    {
        public string firstName {  get; set; }
        public string lastName { get; set; }
        public string position { get; set; }
        public List<string> years { get; set; }
        public int total {  get; set; }
    }
}
