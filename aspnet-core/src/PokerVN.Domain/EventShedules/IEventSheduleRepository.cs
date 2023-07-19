using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace PokerVN.EventShedules
{
    public interface IEventSheduleRepository : IRepository<EventShedule, Guid>
    {
        Task<List<EventShedule>> GetListAsync(
            string filterText = null,
            string eventCode = null,
            string eventName = null,
            string clubCode = null,
            string matchDay = null,
            string timeDay = null,
            DateTime? fullMatchDayMin = null,
            DateTime? fullMatchDayMax = null,
            string descEvent = null,
            string days = null,
            string entryCostVND = null,
            string descEntryCostVND = null,
            string entryCostUSD = null,
            string descEntryCostUSD = null,
            string guaranteeVND = null,
            string guaranteeUSD = null,
            string stackBegin = null,
            string blinds = null,
            string regCloseStartOfLevel = null,
            string regCloseStartOfTime = null,
            string liveFinal = null,
            string isHighRoller = null,
            string isDeepStack = null,
            string sorting = null,
            int maxResultCount = int.MaxValue,
            int skipCount = 0,
            CancellationToken cancellationToken = default
        );

        Task<long> GetCountAsync(
            string filterText = null,
            string eventCode = null,
            string eventName = null,
            string clubCode = null,
            string matchDay = null,
            string timeDay = null,
            DateTime? fullMatchDayMin = null,
            DateTime? fullMatchDayMax = null,
            string descEvent = null,
            string days = null,
            string entryCostVND = null,
            string descEntryCostVND = null,
            string entryCostUSD = null,
            string descEntryCostUSD = null,
            string guaranteeVND = null,
            string guaranteeUSD = null,
            string stackBegin = null,
            string blinds = null,
            string regCloseStartOfLevel = null,
            string regCloseStartOfTime = null,
            string liveFinal = null,
            string isHighRoller = null,
            string isDeepStack = null,
            CancellationToken cancellationToken = default);
    }
}