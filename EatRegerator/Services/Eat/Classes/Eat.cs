using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EatRegerator.Services.Classes
{
  public class Dishes
  {
    public Guid DishGuid { get; set; }
    public int? CookingTime { get; set; }
    public Guid TypeGuid { get; set; }
    public string Title { get; set; }
    public Guid TypeKitchenGuid { get; set; }
    public Guid TypeMenuGuid { get; set; }
  }

  public class Products
  {
    public Guid ProductGuid { get; set; }
    public string Name { get; set; }
  }

  public class Recipes
  {
    public Guid RecipeGuid { get; set; }
    public string Text { get; set; }
    public int Order { get; set; }
    public string PictureUrl { get; set; }
    public string Title { get; set; }
    public Guid DishGuid { get; set; }
  }

  public class TypeDishes
  {
    public Guid TypeGuid { get; set; }
    public string Title { get; set; }
    public int Code { get; set; }
  }

  public class TypeKitchen
  {
    public Guid KitchenTypeGuid { get; set; }
    public string Title { get; set; }
    public int Code { get; set; }
  }

  public class TypeMenu
  {
    public Guid TypeMenuGuid { get; set; }
    public string Title { get; set; }
    public int Code { get; set; }
  }

  public class ProductsResult : BaseResult
  {
    public List<Products> Products { get; set; }
  }

  public class TypeDishesResult : BaseResult
  {
    public List<TypeDishes> TypeDishes { get; set; }
  }

  public class TypesKitchensResult : BaseResult
  {
    public List<TypeKitchen> TypesKitchen { get; set; }
  }

  public class TypesMenuResult : BaseResult
  {
    public List<TypeMenu> TypesMenu { get; set; }
  }
}
