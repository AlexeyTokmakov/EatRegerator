using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EatRegerator.Services.ObjectCache
{
  public interface IObjectCache
  {
    object GetItem(Guid key);

    bool Contains(Guid key);

    void SetItem(Guid key, object item);

    void SetItemWithExpiration(Guid key, object item, TimeSpan lifetime);
    void DeleteItem(Guid key);
  }
}
