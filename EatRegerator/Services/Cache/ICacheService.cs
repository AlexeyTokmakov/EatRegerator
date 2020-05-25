using EatRegerator.Services.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EatRegerator.Services.Cache
{
  public interface ICacheService
  {
    Task InitCache();
    Task<ProductsResult> GetProducts(string searchString);
    Task<BaseResult> ReloadCache();

  }
}
