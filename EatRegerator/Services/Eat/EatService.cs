using EatRegeratorAPI.Client;
using EatRegerator.Services.Eat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EatRegerator.Services.Classes;

namespace EatRegerator.Services.Eat
{
  public class EatService : IEatService
  {
    private readonly IEatRegeratorAPIClient _eatClient;
    public EatService(IEatRegeratorAPIClient eatClient)
    {
      _eatClient = eatClient;
    }

    public async Task<ProductsResult> GetProducts()
    {
      ProductsResult result = new ProductsResult();
      try
      {
        GetProductsResult output = await _eatClient.GetProductsAsync();
        if (output.ResultCode == -1) throw new Exception();
        result.Products = output.Products?.Select(p => new Classes.Products
        {
          ProductGuid = p.ProductGuid,
          Name = p.Name
        }).ToList() ?? new List<Classes.Products>();
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }

    public async Task<TypeDishesResult> GetTypeDishes()
    {
      TypeDishesResult result = new TypeDishesResult();
      try
      {
        GetTypeDishesResult output = await _eatClient.GetTypeDishesAsync();
        if (output.ResultCode == -1) throw new Exception();
        result.TypeDishes = output.TypeDishes?.Select(t => new Classes.TypeDishes
        {
          TypeGuid = t.TypeGuid,
          Code =t.Code,
          Title = t.Title
        }).ToList() ?? new List<Classes.TypeDishes>();
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }

    public async Task<TypesKitchensResult> GetTypesKitchens()
    {
      TypesKitchensResult result = new TypesKitchensResult();
      try
      {
        GetTypesKitchensResult output = await _eatClient.GetTypesKitchensAsync();
        if (output.ResultCode == -1) throw new Exception();
        result.TypesKitchen = output.TypesKitchen?.Select(t => new Classes.TypeKitchen
        {
          KitchenTypeGuid = t.KitchenTypeGuid,
          Code = t.Code,
          Title = t.Title
        }).ToList() ?? new List<Classes.TypeKitchen>();
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }

    public async Task<TypesMenuResult> GetTypesMenu()
    {
      TypesMenuResult result = new TypesMenuResult();
      try
      {
        GetTypesMenuResult output = await _eatClient.GetTypesMenuAsync();
        if (output.ResultCode == -1) throw new Exception();
        result.TypesMenu = output.TypesMenu?.Select(t => new Classes.TypeMenu
        {
          TypeMenuGuid = t.TypeMenuGuid,
          Code = t.Code,
          Title = t.Title
        }).ToList() ?? new List<Classes.TypeMenu>();
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }


    private void SetException(BaseResult result, Exception ex)
    {
      result.ResultCode = -1;
      result.Error = ex.Message;
    }

  }
}
