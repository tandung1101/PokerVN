import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetPokerClubsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  clubCode?: string;
  clubName?: string;
  aliasName?: string;
  releaseDate?: string;
  clubAddress?: string;
  clubAddress1?: string;
  clubAddress2?: string;
  clubAddress3?: string;
  phoneNumber?: string;
  email?: string;
  refFb?: string;
  description?: string;
  statusCode?: string;
}

export interface PokerClubCreateDto {
  clubCode?: string;
  clubName?: string;
  aliasName?: string;
  releaseDate?: string;
  clubAddress?: string;
  clubAddress1?: string;
  clubAddress2?: string;
  clubAddress3?: string;
  phoneNumber?: string;
  email?: string;
  refFb?: string;
  description?: string;
  statusCode?: string;
}

export interface PokerClubDto extends FullAuditedEntityDto<string> {
  clubCode?: string;
  clubName?: string;
  aliasName?: string;
  releaseDate?: string;
  clubAddress?: string;
  clubAddress1?: string;
  clubAddress2?: string;
  clubAddress3?: string;
  phoneNumber?: string;
  email?: string;
  refFb?: string;
  description?: string;
  statusCode?: string;
  concurrencyStamp?: string;
}

export interface PokerClubExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  name?: string;
}

export interface PokerClubUpdateDto {
  clubCode?: string;
  clubName?: string;
  aliasName?: string;
  releaseDate?: string;
  clubAddress?: string;
  clubAddress1?: string;
  clubAddress2?: string;
  clubAddress3?: string;
  phoneNumber?: string;
  email?: string;
  refFb?: string;
  description?: string;
  statusCode?: string;
  concurrencyStamp?: string;
}
