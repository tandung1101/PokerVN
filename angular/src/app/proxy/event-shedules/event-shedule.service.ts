import type { EventSheduleCreateDto, EventSheduleDto, EventSheduleExcelDownloadDto, EventSheduleUpdateDto, GetEventShedulesInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class EventSheduleService {
  apiName = 'Default';
  

  create = (input: EventSheduleCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EventSheduleDto>({
      method: 'POST',
      url: '/api/app/event-shedules',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/event-shedules/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EventSheduleDto>({
      method: 'GET',
      url: `/api/app/event-shedules/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/event-shedules/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetEventShedulesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<EventSheduleDto>>({
      method: 'GET',
      url: '/api/app/event-shedules',
      params: { filterText: input.filterText, eventCode: input.eventCode, eventName: input.eventName, clubCode: input.clubCode, matchDay: input.matchDay, timeDay: input.timeDay, fullMatchDayMin: input.fullMatchDayMin, fullMatchDayMax: input.fullMatchDayMax, descEvent: input.descEvent, days: input.days, entryCostVND: input.entryCostVND, descEntryCostVND: input.descEntryCostVND, entryCostUSD: input.entryCostUSD, descEntryCostUSD: input.descEntryCostUSD, guaranteeVND: input.guaranteeVND, guaranteeUSD: input.guaranteeUSD, stackBegin: input.stackBegin, blinds: input.blinds, regCloseStartOfLevel: input.regCloseStartOfLevel, regCloseStartOfTime: input.regCloseStartOfTime, liveFinal: input.liveFinal, isHighRoller: input.isHighRoller, isDeepStack: input.isDeepStack, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: EventSheduleExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/event-shedules/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, name: input.name },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: EventSheduleUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EventSheduleDto>({
      method: 'PUT',
      url: `/api/app/event-shedules/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
