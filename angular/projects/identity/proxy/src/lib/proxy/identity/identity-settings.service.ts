import type { IdentityLdapSettingsDto, IdentityOAuthSettingsDto, IdentitySettingsDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentitySettingsService {
  apiName = 'AbpIdentity';
  

  get = () =>
    this.restService.request<any, IdentitySettingsDto>({
      method: 'GET',
      url: '/api/identity/settings',
    },
    { apiName: this.apiName });
  

  getLdap = () =>
    this.restService.request<any, IdentityLdapSettingsDto>({
      method: 'GET',
      url: '/api/identity/settings/ldap',
    },
    { apiName: this.apiName });
  

  getOAuth = () =>
    this.restService.request<any, IdentityOAuthSettingsDto>({
      method: 'GET',
      url: '/api/identity/settings/oauth',
    },
    { apiName: this.apiName });
  

  update = (input: IdentitySettingsDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/identity/settings',
      body: input,
    },
    { apiName: this.apiName });
  

  updateLdap = (input: IdentityLdapSettingsDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/identity/settings/ldap',
      body: input,
    },
    { apiName: this.apiName });
  

  updateOAuth = (input: IdentityOAuthSettingsDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/identity/settings/oauth',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
