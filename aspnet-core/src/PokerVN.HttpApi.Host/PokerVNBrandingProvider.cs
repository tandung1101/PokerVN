using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace PokerVN;

[Dependency(ReplaceServices = true)]
public class PokerVNBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "PokerVN";
}
