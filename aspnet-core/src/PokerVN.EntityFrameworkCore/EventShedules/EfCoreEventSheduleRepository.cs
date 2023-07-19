using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using PokerVN.EntityFrameworkCore;

namespace PokerVN.EventShedules
{
    public class EfCoreEventSheduleRepository : EfCoreRepository<PokerVNDbContext, EventShedule, Guid>, IEventSheduleRepository
    {
        public EfCoreEventSheduleRepository(IDbContextProvider<PokerVNDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        public async Task<List<EventShedule>> GetListAsync(
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
            CancellationToken cancellationToken = default)
        {
            var query = ApplyFilter((await GetQueryableAsync()), filterText, eventCode, eventName, clubCode, matchDay, timeDay, fullMatchDayMin, fullMatchDayMax, descEvent, days, entryCostVND, descEntryCostVND, entryCostUSD, descEntryCostUSD, guaranteeVND, guaranteeUSD, stackBegin, blinds, regCloseStartOfLevel, regCloseStartOfTime, liveFinal, isHighRoller, isDeepStack);
            query = query.OrderBy(string.IsNullOrWhiteSpace(sorting) ? EventSheduleConsts.GetDefaultSorting(false) : sorting);
            return await query.PageBy(skipCount, maxResultCount).ToListAsync(cancellationToken);
        }

        public async Task<long> GetCountAsync(
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
            CancellationToken cancellationToken = default)
        {
            var query = ApplyFilter((await GetDbSetAsync()), filterText, eventCode, eventName, clubCode, matchDay, timeDay, fullMatchDayMin, fullMatchDayMax, descEvent, days, entryCostVND, descEntryCostVND, entryCostUSD, descEntryCostUSD, guaranteeVND, guaranteeUSD, stackBegin, blinds, regCloseStartOfLevel, regCloseStartOfTime, liveFinal, isHighRoller, isDeepStack);
            return await query.LongCountAsync(GetCancellationToken(cancellationToken));
        }

        protected virtual IQueryable<EventShedule> ApplyFilter(
            IQueryable<EventShedule> query,
            string filterText,
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
            string isDeepStack = null)
        {
            return query
                    .WhereIf(!string.IsNullOrWhiteSpace(filterText), e => e.EventCode.Contains(filterText) || e.EventName.Contains(filterText) || e.ClubCode.Contains(filterText) || e.MatchDay.Contains(filterText) || e.TimeDay.Contains(filterText) || e.DescEvent.Contains(filterText) || e.Days.Contains(filterText) || e.EntryCostVND.Contains(filterText) || e.DescEntryCostVND.Contains(filterText) || e.EntryCostUSD.Contains(filterText) || e.DescEntryCostUSD.Contains(filterText) || e.GuaranteeVND.Contains(filterText) || e.GuaranteeUSD.Contains(filterText) || e.StackBegin.Contains(filterText) || e.Blinds.Contains(filterText) || e.RegCloseStartOfLevel.Contains(filterText) || e.RegCloseStartOfTime.Contains(filterText) || e.LiveFinal.Contains(filterText) || e.IsHighRoller.Contains(filterText) || e.IsDeepStack.Contains(filterText))
                    .WhereIf(!string.IsNullOrWhiteSpace(eventCode), e => e.EventCode.Contains(eventCode))
                    .WhereIf(!string.IsNullOrWhiteSpace(eventName), e => e.EventName.Contains(eventName))
                    .WhereIf(!string.IsNullOrWhiteSpace(clubCode), e => e.ClubCode.Contains(clubCode))
                    .WhereIf(!string.IsNullOrWhiteSpace(matchDay), e => e.MatchDay.Contains(matchDay))
                    .WhereIf(!string.IsNullOrWhiteSpace(timeDay), e => e.TimeDay.Contains(timeDay))
                    .WhereIf(fullMatchDayMin.HasValue, e => e.FullMatchDay >= fullMatchDayMin.Value)
                    .WhereIf(fullMatchDayMax.HasValue, e => e.FullMatchDay <= fullMatchDayMax.Value)
                    .WhereIf(!string.IsNullOrWhiteSpace(descEvent), e => e.DescEvent.Contains(descEvent))
                    .WhereIf(!string.IsNullOrWhiteSpace(days), e => e.Days.Contains(days))
                    .WhereIf(!string.IsNullOrWhiteSpace(entryCostVND), e => e.EntryCostVND.Contains(entryCostVND))
                    .WhereIf(!string.IsNullOrWhiteSpace(descEntryCostVND), e => e.DescEntryCostVND.Contains(descEntryCostVND))
                    .WhereIf(!string.IsNullOrWhiteSpace(entryCostUSD), e => e.EntryCostUSD.Contains(entryCostUSD))
                    .WhereIf(!string.IsNullOrWhiteSpace(descEntryCostUSD), e => e.DescEntryCostUSD.Contains(descEntryCostUSD))
                    .WhereIf(!string.IsNullOrWhiteSpace(guaranteeVND), e => e.GuaranteeVND.Contains(guaranteeVND))
                    .WhereIf(!string.IsNullOrWhiteSpace(guaranteeUSD), e => e.GuaranteeUSD.Contains(guaranteeUSD))
                    .WhereIf(!string.IsNullOrWhiteSpace(stackBegin), e => e.StackBegin.Contains(stackBegin))
                    .WhereIf(!string.IsNullOrWhiteSpace(blinds), e => e.Blinds.Contains(blinds))
                    .WhereIf(!string.IsNullOrWhiteSpace(regCloseStartOfLevel), e => e.RegCloseStartOfLevel.Contains(regCloseStartOfLevel))
                    .WhereIf(!string.IsNullOrWhiteSpace(regCloseStartOfTime), e => e.RegCloseStartOfTime.Contains(regCloseStartOfTime))
                    .WhereIf(!string.IsNullOrWhiteSpace(liveFinal), e => e.LiveFinal.Contains(liveFinal))
                    .WhereIf(!string.IsNullOrWhiteSpace(isHighRoller), e => e.IsHighRoller.Contains(isHighRoller))
                    .WhereIf(!string.IsNullOrWhiteSpace(isDeepStack), e => e.IsDeepStack.Contains(isDeepStack));
        }
    }
}