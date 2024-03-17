using BallonDorEntities.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace BallonDorEntities.Models
{
    public class JsonDb
    {
        public static List<BallonDor> GetAllItems()
        {
            string json = Resources.staticDB;

            return JsonSerializer.Deserialize<List<BallonDor>>(json);
        }
    }
}
