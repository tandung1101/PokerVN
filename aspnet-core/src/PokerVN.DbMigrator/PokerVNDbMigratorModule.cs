using PokerVN.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace PokerVN.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(PokerVNEntityFrameworkCoreModule),
    typeof(PokerVNApplicationContractsModule)
)]
public class PokerVNDbMigratorModule : AbpModule
{

}
