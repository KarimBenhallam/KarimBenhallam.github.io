using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BallonDorEntities.Models
{
    public class BallonDor
    {
        [Key]
        public string year { get; set; }
        public string winnerFirstName { get; set; }
        public string winnerLastName { get; set; }
        public string winnerFullName { get; set; }
        public string winnerPosition { get; set; }

    }
}
