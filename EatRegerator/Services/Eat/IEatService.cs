using EatRegerator.Services.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EatRegerator.Services.Eat
{
  public interface IEatService
  {
    Task<ProductsResult> GetProducts();
    Task<TypeDishesResult> GetTypeDishes();
    Task<TypesKitchensResult> GetTypesKitchens();
    Task<TypesMenuResult> GetTypesMenu();
  }
}
