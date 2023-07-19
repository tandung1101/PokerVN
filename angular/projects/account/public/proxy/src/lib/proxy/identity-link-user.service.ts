import type { IsLinkedInput, LinkUserDto, LinkUserInput, UnLinkUserInput, VerifyLinkLoginTokenInput, VerifyLinkTokenInput } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentityLinkUserService {
  apiName = 'AbpAccountPublic';
  

  generateLinkLoginToken = () =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/account/link-user/generate-link-login-token',
    },
    { apiName: this.apiName });
  

  generateLinkToken = () =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/account/link-user/generate-link-token',
    },
    { apiName: this.apiName });
  

  getAllList = () =>
    this.restService.request<any, ListResultDto<LinkUserDto>>({
      method: 'GET',
      url: '/api/account/link-user',
    },
    { apiName: this.apiName });
  

  isLinked = (input: IsLinkedInput) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/account/link-user/is-linked',
      body: input,
    },
    { apiName: this.apiName });
  

  link = (input: LinkUserInput) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/account/link-user/link',
      body: input,
    },
    { apiName: this.apiName });
  

  unlink = (input: UnLinkUserInput) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/account/link-user/unlink',
      body: input,
    },
    { apiName: this.apiName });
  

  verifyLinkLoginToken = (input: VerifyLinkLoginTokenInput) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/account/link-user/verify-link-login-token',
      body: input,
    },
    { apiName: this.apiName });
  

  verifyLinkToken = (input: VerifyLinkTokenInput) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/account/link-user/verify-link-token',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
