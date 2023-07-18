using PokerVN.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace PokerVN.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class PokerVNController : AbpControllerBase
{
    protected PokerVNController()
    {
        LocalizationResource = typeof(PokerVNResource);
    }
}
