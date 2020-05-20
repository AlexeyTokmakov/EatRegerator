using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

    public EatController(ILogger<EatController> logger, IEatService _eatService)
    {
      _logger = logger;
      eatService = _eatService;
    }

    [HttpGet("GetProducts")]
    public Task<ProductsResult> GetProducts()
    {
      return eatService.GetProducts();
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

  }
}
