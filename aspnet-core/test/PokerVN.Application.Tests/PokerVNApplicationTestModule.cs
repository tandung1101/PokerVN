using Volo.Abp.Modularity;

namespace PokerVN;

[DependsOn(
    typeof(PokerVNApplicationModule),
    typeof(PokerVNDomainTestModule)
    )]
public class PokerVNApplicationTestModule : AbpModule
{

}
