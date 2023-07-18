using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PokerVN.Data;
using Volo.Abp.DependencyInjection;

namespace PokerVN.EntityFrameworkCore;

public class EntityFrameworkCorePokerVNDbSchemaMigrator
    : IPokerVNDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCorePokerVNDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the PokerVNDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<PokerVNDbContext>()
            .Database
            .MigrateAsync();
    }
}
