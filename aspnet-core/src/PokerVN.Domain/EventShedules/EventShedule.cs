using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;
using JetBrains.Annotations;

using Volo.Abp;

namespace PokerVN.EventShedules
{
    public class EventShedule : FullAuditedAggregateRoot<Guid>
    {
        [CanBeNull]
        public virtual string? EventCode { get; set; }

        [CanBeNull]
        public virtual string? EventName { get; set; }

        [CanBeNull]
        public virtual string? ClubCode { get; set; }

        [CanBeNull]
        public virtual string? MatchDay { get; set; }

        [CanBeNull]
        public virtual string? TimeDay { get; set; }

        public virtual DateTime FullMatchDay { get; set; }

        [CanBeNull]
        public virtual string? DescEvent { get; set; }

        [CanBeNull]
        public virtual string? Days { get; set; }

        [CanBeNull]
        public virtual string? EntryCostVND { get; set; }

        [CanBeNull]
        public virtual string? DescEntryCostVND { get; set; }

        [CanBeNull]
        public virtual string? EntryCostUSD { get; set; }

        [CanBeNull]
        public virtual string? DescEntryCostUSD { get; set; }

        [CanBeNull]
        public virtual string? GuaranteeVND { get; set; }

        [CanBeNull]
        public virtual string? GuaranteeUSD { get; set; }

        [CanBeNull]
        public virtual string? StackBegin { get; set; }

        [CanBeNull]
        public virtual string? Blinds { get; set; }

        [CanBeNull]
        public virtual string? RegCloseStartOfLevel { get; set; }

        [CanBeNull]
        public virtual string? RegCloseStartOfTime { get; set; }

        [CanBeNull]
        public virtual string? LiveFinal { get; set; }

        [CanBeNull]
        public virtual string? IsHighRoller { get; set; }

        [CanBeNull]
        public virtual string? IsDeepStack { get; set; }

        public EventShedule()
        {

        }

        public EventShedule(Guid id, string eventCode, string eventName, string clubCode, string matchDay, string timeDay, DateTime fullMatchDay, string descEvent, string days, string entryCostVND, string descEntryCostVND, string entryCostUSD, string descEntryCostUSD, string guaranteeVND, string guaranteeUSD, string stackBegin, string blinds, string regCloseStartOfLevel, string regCloseStartOfTime, string liveFinal, string isHighRoller, string isDeepStack)
        {

            Id = id;
            EventCode = eventCode;
            EventName = eventName;
            ClubCode = clubCode;
            MatchDay = matchDay;
            TimeDay = timeDay;
            FullMatchDay = fullMatchDay;
            DescEvent = descEvent;
            Days = days;
            EntryCostVND = entryCostVND;
            DescEntryCostVND = descEntryCostVND;
            EntryCostUSD = entryCostUSD;
            DescEntryCostUSD = descEntryCostUSD;
            GuaranteeVND = guaranteeVND;
            GuaranteeUSD = guaranteeUSD;
            StackBegin = stackBegin;
            Blinds = blinds;
            RegCloseStartOfLevel = regCloseStartOfLevel;
            RegCloseStartOfTime = regCloseStartOfTime;
            LiveFinal = liveFinal;
            IsHighRoller = isHighRoller;
            IsDeepStack = isDeepStack;
        }

    }
}