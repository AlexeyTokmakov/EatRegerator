using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EatRegerator.Services.ObjectCache
{
  public class ObjectCache : IObjectCache
  {
    private readonly MemoryCache _memoryCache = null;
    private readonly object _locker = new object();

    public ObjectCache()
    {
      IOptions<MemoryCacheOptions> optionsAccessor = new MemoryCacheOptions();
      //optionsAccessor.Value.CompactOnMemoryPressure = true;
      optionsAccessor.Value.ExpirationScanFrequency = new TimeSpan(0, 1, 0);

      _memoryCache = new MemoryCache(optionsAccessor);
    }

    public object GetItem(Guid key)
    {
      return _memoryCache.Get(key);
    }

    public bool Contains(Guid key)
    {
      return _memoryCache.Get(key) != null;
    }

    public void SetItem(Guid key, object item)
    {
      lock (_locker)
      {
        _memoryCache.Set(key, item);
      }
    }

    public void SetItemWithExpiration(Guid key, object item, TimeSpan lifetime)
    {
      lock (_locker)
      {
        _memoryCache.Set(key, item, lifetime);
      }
    }

    public void DeleteItem(Guid key)
    {
      if (_memoryCache.Get(key) != null)
        _memoryCache.Remove(key);
    }

  }
}
