using System.Threading.Tasks;

namespace PokerVN.Data;

public interface IPokerVNDbSchemaMigrator
{
    Task MigrateAsync();
}
