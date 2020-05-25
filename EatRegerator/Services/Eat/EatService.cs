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

    public async Task<DishesResult> GetDishes(Classes.GetDishesInput input)
    {
      DishesResult result = new DishesResult();
      try
      {
        EatRegeratorAPI.Client.GetDishesInput inputDishes = new EatRegeratorAPI.Client.GetDishesInput();
        inputDishes.TypeDishesGuid = input.TypeDishesGuid;
        inputDishes.TypeKitchensGuid = input.TypeKitchensGuid;
        inputDishes.TypeMenuGuid = input.TypeMenuGuid;
        inputDishes.IncreaseProductGuids = input.IncreaseProductGuids;
        inputDishes.DecreaseProductGuids = input.DecreaseProductGuids;

        GetDishesResult output = await _eatClient.GetDishesAsync(inputDishes);
        if (output.ResultCode == -1) throw new Exception();

        result.Dishes = output.Dishes?.Select(d => new Classes.Dishes
        {
          DishGuid = d.DishGuid,
          Title = d?.Title,
          PictureUrl = d?.PictureUrl,
          Description = d?.Description
        }).ToList() ?? new List<Classes.Dishes>();
      }
      catch(Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }

    public async Task<RecipeResult> GetRecipe(Guid dishGuid)
    {
      RecipeResult result = new RecipeResult();
      try
      {
        GetRecipeResult output = await _eatClient.GetRecipeAsync(dishGuid);
        if (output.ResultCode == -1) throw new Exception();
        result.Recipe = new Classes.DishRecipe();
        result.Recipe.CookingTime = output.Recipe.CookingTime;
        result.Recipe.Description = output.Recipe.Description;
        result.Recipe.DishGuid = output.Recipe.DishGuid;
        result.Recipe.PictureUrl = output.Recipe.PictureUrl;
        result.Recipe.Title = output.Recipe.Title;
        result.Recipe.Recipe = output.Recipe.Recipe.Select(r => new Classes.Recipes
        {
          RecipeGuid = r.RecipeGuid,
          Order = r.Order,
          PictureUrl = r?.PictureUrl,
          Text = r?.Text,
          Title = r?.Title
        }).OrderBy(r=>r.Order).ToList() ?? new List<Classes.Recipes>();

      }
      catch(Exception ex)
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
