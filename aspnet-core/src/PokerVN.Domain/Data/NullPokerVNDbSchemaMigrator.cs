using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace PokerVN.Data;

/* This is used if database provider does't define
 * IPokerVNDbSchemaMigrator implementation.
 */
public class NullPokerVNDbSchemaMigrator : IPokerVNDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
