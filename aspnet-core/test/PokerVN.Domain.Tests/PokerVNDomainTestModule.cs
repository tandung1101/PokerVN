using PokerVN.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace PokerVN;

[DependsOn(
    typeof(PokerVNEntityFrameworkCoreTestModule)
    )]
public class PokerVNDomainTestModule : AbpModule
{

}
