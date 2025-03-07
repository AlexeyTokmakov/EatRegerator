﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EatRegerator.Services.Cache;
using EatRegerator.Services.Classes;
using EatRegerator.Services.Eat;
using EatRegeratorAPI.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EatRegerator.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class EatController : ControllerBase
  {
    private readonly ILogger<EatController> _logger;
    private readonly IEatService eatService;
    private readonly ICacheService cache;

    public EatController(ILogger<EatController> logger, IEatService _eatService, ICacheService _cache)
    {
      _logger = logger;
      eatService = _eatService;
      cache = _cache;
    }

    [HttpPost("GetProducts")]
    public Task<ProductsResult> GetProducts([FromBody]string searchString)
    {
      return cache.GetProducts(searchString);
    }

    [HttpGet("GetTypeDishes")]
    public Task<TypeDishesResult> GetTypeDishes()
    {
      return eatService.GetTypeDishes();
    }

    [HttpGet("GetTypesKitchens")]
    public Task<TypesKitchensResult> GetTypesKitchens()
    {
      return eatService.GetTypesKitchens();
    }

    [HttpGet("GetTypesMenu")]
    public Task<TypesMenuResult> GetTypesMenu()
    {
      return eatService.GetTypesMenu();
    }

    [HttpPost("GetDishes")]
    public Task<DishesResult> GetDishes([FromBody]Services.Classes.GetDishesInput input)
    {
      return eatService.GetDishes(input);
    }

    [HttpPost("GetRecipe")]
    public Task<RecipeResult> GetRecipe([FromBody]Guid dishGuid)
    {
      return eatService.GetRecipe(dishGuid);
    }

  }
}
