using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;

namespace PokerVN.EventShedules
{
    public class EventSheduleDto : FullAuditedEntityDto<Guid>, IHasConcurrencyStamp
    {
        public string? EventCode { get; set; }
        public string? EventName { get; set; }
        public string? ClubCode { get; set; }
        public string? MatchDay { get; set; }
        public string? TimeDay { get; set; }
        public DateTime FullMatchDay { get; set; }
        public string? DescEvent { get; set; }
        public string? Days { get; set; }
        public string? EntryCostVND { get; set; }
        public string? DescEntryCostVND { get; set; }
        public string? EntryCostUSD { get; set; }
        public string? DescEntryCostUSD { get; set; }
        public string? GuaranteeVND { get; set; }
        public string? GuaranteeUSD { get; set; }
        public string? StackBegin { get; set; }
        public string? Blinds { get; set; }
        public string? RegCloseStartOfLevel { get; set; }
        public string? RegCloseStartOfTime { get; set; }
        public string? LiveFinal { get; set; }
        public string? IsHighRoller { get; set; }
        public string? IsDeepStack { get; set; }

        public string ConcurrencyStamp { get; set; }
    }
}