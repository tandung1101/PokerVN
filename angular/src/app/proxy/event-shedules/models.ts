import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface EventSheduleCreateDto {
  eventCode?: string;
  eventName?: string;
  clubCode?: string;
  matchDay?: string;
  timeDay?: string;
  fullMatchDay?: string;
  descEvent?: string;
  days?: string;
  entryCostVND?: string;
  descEntryCostVND?: string;
  entryCostUSD?: string;
  descEntryCostUSD?: string;
  guaranteeVND?: string;
  guaranteeUSD?: string;
  stackBegin?: string;
  blinds?: string;
  regCloseStartOfLevel?: string;
  regCloseStartOfTime?: string;
  liveFinal?: string;
  isHighRoller?: string;
  isDeepStack?: string;
}

export interface EventSheduleDto extends FullAuditedEntityDto<string> {
  eventCode?: string;
  eventName?: string;
  clubCode?: string;
  matchDay?: string;
  timeDay?: string;
  fullMatchDay?: string;
  descEvent?: string;
  days?: string;
  entryCostVND?: string;
  descEntryCostVND?: string;
  entryCostUSD?: string;
  descEntryCostUSD?: string;
  guaranteeVND?: string;
  guaranteeUSD?: string;
  stackBegin?: string;
  blinds?: string;
  regCloseStartOfLevel?: string;
  regCloseStartOfTime?: string;
  liveFinal?: string;
  isHighRoller?: string;
  isDeepStack?: string;
  concurrencyStamp?: string;
}

export interface EventSheduleExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  name?: string;
}

export interface EventSheduleUpdateDto {
  eventCode?: string;
  eventName?: string;
  clubCode?: string;
  matchDay?: string;
  timeDay?: string;
  fullMatchDay?: string;
  descEvent?: string;
  days?: string;
  entryCostVND?: string;
  descEntryCostVND?: string;
  entryCostUSD?: string;
  descEntryCostUSD?: string;
  guaranteeVND?: string;
  guaranteeUSD?: string;
  stackBegin?: string;
  blinds?: string;
  regCloseStartOfLevel?: string;
  regCloseStartOfTime?: string;
  liveFinal?: string;
  isHighRoller?: string;
  isDeepStack?: string;
  concurrencyStamp?: string;
}

export interface GetEventShedulesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  eventCode?: string;
  eventName?: string;
  clubCode?: string;
  matchDay?: string;
  timeDay?: string;
  fullMatchDayMin?: string;
  fullMatchDayMax?: string;
  descEvent?: string;
  days?: string;
  entryCostVND?: string;
  descEntryCostVND?: string;
  entryCostUSD?: string;
  descEntryCostUSD?: string;
  guaranteeVND?: string;
  guaranteeUSD?: string;
  stackBegin?: string;
  blinds?: string;
  regCloseStartOfLevel?: string;
  regCloseStartOfTime?: string;
  liveFinal?: string;
  isHighRoller?: string;
  isDeepStack?: string;
}
