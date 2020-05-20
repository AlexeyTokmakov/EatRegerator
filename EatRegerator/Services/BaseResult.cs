using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EatRegerator.Services
{
  public class BaseResult
  {
    public int ResultCode { get; set; }
    public string Error { get; set; }
  }
}
