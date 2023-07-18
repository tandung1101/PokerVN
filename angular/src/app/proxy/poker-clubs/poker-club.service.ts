import type { GetPokerClubsInput, PokerClubCreateDto, PokerClubDto, PokerClubExcelDownloadDto, PokerClubUpdateDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class PokerClubService {
  apiName = 'Default';
  

  create = (input: PokerClubCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PokerClubDto>({
      method: 'POST',
      url: '/api/app/poker-clubs',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/poker-clubs/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PokerClubDto>({
      method: 'GET',
      url: `/api/app/poker-clubs/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/poker-clubs/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetPokerClubsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PokerClubDto>>({
      method: 'GET',
      url: '/api/app/poker-clubs',
      params: { filterText: input.filterText, clubCode: input.clubCode, clubName: input.clubName, aliasName: input.aliasName, releaseDate: input.releaseDate, clubAddress: input.clubAddress, clubAddress1: input.clubAddress1, clubAddress2: input.clubAddress2, clubAddress3: input.clubAddress3, phoneNumber: input.phoneNumber, email: input.email, refFb: input.refFb, description: input.description, statusCode: input.statusCode, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: PokerClubExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/poker-clubs/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, name: input.name },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: PokerClubUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PokerClubDto>({
      method: 'PUT',
      url: `/api/app/poker-clubs/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
