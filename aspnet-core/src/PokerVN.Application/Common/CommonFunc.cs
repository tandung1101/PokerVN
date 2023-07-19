using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PokerVN.Common
{
    public static class Common
    {
        public static string GenerateNumberString(int number, int totalDigits)
        {
            string numberString = number.ToString().PadLeft(totalDigits, '0');
            return numberString;
        }
    } 
}
