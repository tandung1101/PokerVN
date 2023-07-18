using PokerVN.Localization;
using Volo.Abp.Application.Services;

namespace PokerVN;

/* Inherit your application services from this class.
 */
public abstract class PokerVNAppService : ApplicationService
{
    protected PokerVNAppService()
    {
        LocalizationResource = typeof(PokerVNResource);
    }
}
