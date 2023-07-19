using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Data;

namespace PokerVN.EventShedules
{
    public class EventSheduleManager : DomainService
    {
        private readonly IEventSheduleRepository _eventSheduleRepository;

        public EventSheduleManager(IEventSheduleRepository eventSheduleRepository)
        {
            _eventSheduleRepository = eventSheduleRepository;
        }

        public async Task<EventShedule> CreateAsync(
        string eventCode, string eventName, string clubCode, string matchDay, string timeDay, DateTime fullMatchDay, string descEvent, string days, string entryCostVND, string descEntryCostVND, string entryCostUSD, string descEntryCostUSD, string guaranteeVND, string guaranteeUSD, string stackBegin, string blinds, string regCloseStartOfLevel, string regCloseStartOfTime, string liveFinal, string isHighRoller, string isDeepStack)
        {
            Check.NotNull(fullMatchDay, nameof(fullMatchDay));

            var eventShedule = new EventShedule(
             GuidGenerator.Create(),
             eventCode, eventName, clubCode, matchDay, timeDay, fullMatchDay, descEvent, days, entryCostVND, descEntryCostVND, entryCostUSD, descEntryCostUSD, guaranteeVND, guaranteeUSD, stackBegin, blinds, regCloseStartOfLevel, regCloseStartOfTime, liveFinal, isHighRoller, isDeepStack
             );

            return await _eventSheduleRepository.InsertAsync(eventShedule);
        }

        public async Task<EventShedule> UpdateAsync(
            Guid id,
            string eventCode, string eventName, string clubCode, string matchDay, string timeDay, DateTime fullMatchDay, string descEvent, string days, string entryCostVND, string descEntryCostVND, string entryCostUSD, string descEntryCostUSD, string guaranteeVND, string guaranteeUSD, string stackBegin, string blinds, string regCloseStartOfLevel, string regCloseStartOfTime, string liveFinal, string isHighRoller, string isDeepStack, [CanBeNull] string concurrencyStamp = null
        )
        {
            Check.NotNull(fullMatchDay, nameof(fullMatchDay));

            var eventShedule = await _eventSheduleRepository.GetAsync(id);

            eventShedule.EventCode = eventCode;
            eventShedule.EventName = eventName;
            eventShedule.ClubCode = clubCode;
            eventShedule.MatchDay = matchDay;
            eventShedule.TimeDay = timeDay;
            eventShedule.FullMatchDay = fullMatchDay;
            eventShedule.DescEvent = descEvent;
            eventShedule.Days = days;
            eventShedule.EntryCostVND = entryCostVND;
            eventShedule.DescEntryCostVND = descEntryCostVND;
            eventShedule.EntryCostUSD = entryCostUSD;
            eventShedule.DescEntryCostUSD = descEntryCostUSD;
            eventShedule.GuaranteeVND = guaranteeVND;
            eventShedule.GuaranteeUSD = guaranteeUSD;
            eventShedule.StackBegin = stackBegin;
            eventShedule.Blinds = blinds;
            eventShedule.RegCloseStartOfLevel = regCloseStartOfLevel;
            eventShedule.RegCloseStartOfTime = regCloseStartOfTime;
            eventShedule.LiveFinal = liveFinal;
            eventShedule.IsHighRoller = isHighRoller;
            eventShedule.IsDeepStack = isDeepStack;

            eventShedule.SetConcurrencyStampIfNotNull(concurrencyStamp);
            return await _eventSheduleRepository.UpdateAsync(eventShedule);
        }

    }
}