using EatRegerator.Services.Cache;
using EatRegerator.Services.Classes;
using EatRegerator.Services.ObjectCache;
using EatRegeratorAPI.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EatRegerator.Services.Cache
{
  public class CacheService : ICacheService
  {
    private readonly IObjectCache _objectCache;
    private readonly IEatRegeratorAPIClient _eatClient;

    private readonly Guid _productCacheKey = new Guid("A71FBB0A-355C-438D-85CA-F73398F8995A");

    public CacheService(
      IObjectCache objectCache,
      IEatRegeratorAPIClient eatClient)
    {
      _objectCache = objectCache;
      _eatClient = eatClient;
    }


    public async Task InitCache()
    {   
      var setProductsCache = SetProductsCache();
      await Task.WhenAll(setProductsCache);
    }


    public async Task<ProductsResult> GetProducts(string searchString)
    {
      ProductsResult result = new ProductsResult();
      try
      {
        GetProductsResult output = (GetProductsResult)_objectCache.GetItem(_productCacheKey);
        if(output == null) throw new Exception("Products not found in cache. Reload the cache or reset it through the admin panel");
        if (output.ResultCode == -1) throw new Exception();
        result.Products = output.Products?.Select(p => new Classes.Products
        {
          ProductGuid = p.ProductGuid,
          Name = p.Name
        }).ToList() ?? new List<Classes.Products>();

        result.Products = result.Products.Where(p => p.Name.IndexOf(searchString) != -1).ToList();
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }

    private async Task SetProductsCache()
    {
      if (!_objectCache.Contains(_productCacheKey))
        _objectCache.SetItem(_productCacheKey, await _eatClient.GetProductsAsync());
    }



    public async Task<BaseResult> ReloadCache()
    {
      BaseResult response = new BaseResult();
      try
      {
        _objectCache.DeleteItem(_productCacheKey);

        GetProductsResult output = await _eatClient.GetProductsAsync();
        if (output == null)
          throw new Exception("Service did not return the products and returned an error: " + output.Error);
        _objectCache.SetItem(_productCacheKey, output);
      }
      catch(Exception ex)
      {
        SetException(response, ex);
      }
      return response;
    }

    private void SetException(BaseResult result, Exception ex)
    {
      result.ResultCode = -1;
      result.Error = ex.Message;
    }

  }
}
